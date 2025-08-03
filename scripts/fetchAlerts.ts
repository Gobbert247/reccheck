import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://theknow.org.au';
const ALERTS_URL = `${BASE_URL}/alerts_warnings/`;
const OUTPUT_PATH = path.join(__dirname, '../data/generated/alerts.json');

// Infer region from title text
const getRegionFromText = (text: string): string => {
  const regions = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];
  const upperText = text.toUpperCase();
  return regions.find(r => upperText.includes(r)) || 'Unknown';
};

(async () => {
  try {
    console.log('🔍 Fetching alerts list from The Know...');
    const res = await fetch(ALERTS_URL);
    const html = await res.text();
    const $ = cheerio.load(html);

    const links = new Set<string>();
    $('a[href^="/alerts_warnings/"]').each((_: any, el: any) => {
      const href = $(el).attr('href');
      if (href && !href.includes('/category/') && !href.includes('#')) {
        links.add(`${BASE_URL}${href}`);
      }
    });

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 120); // ⏳ Extended filter to 120 days

    const alerts: any[] = [];

    for (const url of links) {
      try {
        const alertRes = await fetch(url);
        const alertHtml = await alertRes.text();
        const $$ = cheerio.load(alertHtml);

        const title = $$('h1').first().text().trim();

        // 🔍 Fallback date parser from ".post-date"
        const rawDate = $$('.post-date').first().text().trim(); // e.g., "Posted: July 10, 2024"
        const dateMatch = rawDate.match(/Posted:\s*(.+)/i);
        const parsedDate = dateMatch ? new Date(dateMatch[1]) : new Date(NaN);

        // 🪵 DEBUG: log date + title
        console.log(`[${parsedDate.toISOString().split('T')[0]}] ${title}`);

        if (isNaN(parsedDate.getTime()) || parsedDate < cutoffDate) continue;

        const region = getRegionFromText(title);

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

    // ✅ Write all results at once (outside loop)
    const outDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(alerts, null, 2));
    console.log(`✅ Saved ${alerts.length} alerts to ${OUTPUT_PATH}`);

  } catch (err) {
    console.error('❌ Failed to fetch alerts:', err);
  }
})();
