import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://theknow.org.au';
const ALERTS_URL = `${BASE_URL}/alerts_warnings/`;
const NSW_HEALTH_URL = 'https://www.health.nsw.gov.au/aod/public-drug-alerts/Pages/default.aspx';
const OUTPUT_PATH = path.join(__dirname, '../data/generated/alerts.json');

// Infer region from title text
const getRegionFromText = (text: string): string => {
  const regions = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];
  const upperText = text.toUpperCase();
  return regions.find(r => upperText.includes(r)) || 'Unknown';
};

(async () => {
  try {
    const alerts: any[] = [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 120);

    // 🟠 NSW HEALTH
    try {
      console.log('🔍 Fetching alerts from NSW Health...');
      const res = await fetch(NSW_HEALTH_URL);
      const html = await res.text();
      const $ = cheerio.load(html);

      $('table.ms-rteTable-default tr').each((_, row) => {
        const columns = $(row).find('td');
        if (columns.length >= 2) {
          const dateStr = $(columns[0]).text().trim();
          const linkEl = $(columns[1]).find('a');
          const title = linkEl.text().trim();
          const href = linkEl.attr('href');

          const parsedDate = new Date(dateStr);
          if (!href || isNaN(parsedDate.getTime()) || parsedDate < cutoffDate) return;

          const fullLink = href.startsWith('http') ? href : `https://www.health.nsw.gov.au${href}`;
          const region = getRegionFromText(title);

          console.log(`[NSW Health - ${parsedDate.toISOString().split('T')[0]}] ${title}`);

          alerts.push({
            title,
            date: parsedDate.toISOString().split('T')[0],
            region,
            link: fullLink,
            source: 'NSW Health',
          });
        }
      });
    } catch (err) {
      console.warn('⚠️ Failed to fetch NSW Health alerts', err);
    }

    // 🟠 THE KNOW
    console.log('🔍 Fetching alerts list from The Know...');
    const res = await fetch(ALERTS_URL);
    const html = await res.text();
    const $ = cheerio.load(html);

    const links = new Set<string>();
    $('a[href^="/alerts_warnings/"]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.includes('/category/') && !href.includes('#')) {
        links.add(`${BASE_URL}${href}`);
      }
    });

    for (const url of links) {
      try {
        const alertRes = await fetch(url);
        const alertHtml = await alertRes.text();
        const $$ = cheerio.load(alertHtml);

        const metaDate = $$('.post-meta time, meta[property="article:published_time"]').attr('content');
        const parsedDate = metaDate ? new Date(metaDate) : null;

        console.log(`📅 Parsed meta date from ${url}:`, parsedDate?.toISOString() ?? 'Invalid');
        if (!parsedDate || isNaN(parsedDate.getTime()) || parsedDate < cutoffDate) continue;

        const title = $$('h1.entry-title').first().text().trim() || 'Untitled Alert';
        const region = getRegionFromText(title);

        console.log(`[${parsedDate.toISOString().split('T')[0]}] ${title}`);

        alerts.push({
          title,
          date: parsedDate.toISOString().split('T')[0],
          region,
          link: url,
          source: 'The Know',
        });

      } catch (err) {
        console.warn(`⚠️ Failed to process ${url}`, err);
      }
    }

    // 🟢 SAVE OUTPUT
    const uniqueAlerts = Array.from(new Map(alerts.map(a => [a.link, a])).values());

    const outDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueAlerts, null, 2));
    console.log(`✅ Saved ${uniqueAlerts.length} unique alerts to ${OUTPUT_PATH}`);

  } catch (err) {
    console.error('❌ Failed to fetch alerts:', err);
  }
})();
