import fetch from 'node-fetch';
import cheerio from 'cheerio';
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
    $('a[href^="/alerts_warnings/"]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.includes('/category/') && !href.includes('#')) {
        links.add(`${BASE_URL}${href}`);
      }
    });

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 60);

    const alerts: any[] = [];

    for (const url of links) {
      try {
        const alertRes = await fetch(url);
        const alertHtml = await alertRes.text();
        const $$ = cheerio.load(alertHtml);

        const title = $$('h1').first().text().trim();
        const dateText = $$('time').first().attr('datetime') || $$('time').first().text();
        const date = new Date(dateText);

        if (isNaN(date.getTime()) || date < cutoffDate) continue;

        const region = getRegionFromText(title);

        alerts.push({
          title,
          date: date.toISOString().split('T')[0],
          region,
          link: url,
          source: 'The Know',
        });
      } catch (err) {
        console.warn(`⚠️ Failed to fetch or parse alert: ${url}`, err);
      }
    }

    // Ensure output directory exists
    const outDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(alerts, null, 2));
    console.log(`✅ Saved ${alerts.length} alerts to ${OUTPUT_PATH}`);
  } catch (err) {
    console.error('❌ Failed to fetch alerts:', err);
  }
})();
