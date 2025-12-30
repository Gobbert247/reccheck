// The Know scraper - Primary aggregator for Australian drug alerts
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface DrugAlert {
  id: string;
  title: string;
  substance: string;
  location: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  source: string;
  sourceUrl: string;
}

export async function scrapeTheKnow(): Promise<DrugAlert[]> {
  const alerts: DrugAlert[] = [];
  
  try {
    console.log('Fetching alerts from The Know...');
    const response = await axios.get('https://theknow.org.au/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Parse alert cards from The Know homepage
    $('a[href*="/alerts_warnings/"]').each((index, element) => {
      try {
        const $card = $(element);
        const href = $card.attr('href') || '';
        const fullUrl = href.startsWith('http') ? href : `https://theknow.org.au${href}`;
        
        // Extract date (format: "24 Dec 2025")
        const dateText = $card.find('generic:contains("2025"), generic:contains("2024")').first().text().trim();
        
        // Extract location (NSW, VIC, ACT, QLD, etc.)
        const locationText = $card.find('generic').filter((i, el) => {
          const text = $(el).text().trim();
          return /^(NSW|VIC|ACT|QLD|SA|WA|NT|TAS|National)$/.test(text);
        }).first().text().trim() || 'Unknown';
        
        // Extract title
        const title = $card.find('heading').text().trim();
        
        // Extract alert type (Drug notification, Public drug warning, Community notice)
        const alertType = $card.find('generic').filter((i, el) => {
          const text = $(el).text().trim();
          return /notification|warning|notice/i.test(text);
        }).first().text().trim();
        
        // Determine severity based on alert type
        let severity: 'high' | 'medium' | 'low' = 'medium';
        if (alertType.toLowerCase().includes('warning')) {
          severity = 'high';
        } else if (alertType.toLowerCase().includes('notification')) {
          severity = 'medium';
        } else if (alertType.toLowerCase().includes('notice')) {
          severity = 'low';
        }
        
        // Extract substance from title
        const substance = title.split(' ')[0] || 'Unknown';
        
        if (title && dateText) {
          alerts.push({
            id: `theknow-${Date.now()}-${index}`,
            title,
            substance,
            location: locationText,
            date: dateText,
            severity,
            description: `${alertType}: ${title}`,
            source: 'The Know',
            sourceUrl: fullUrl
          });
        }
      } catch (err) {
        console.warn('Error parsing alert card:', err);
      }
    });
    
    console.log(`Scraped ${alerts.length} alerts from The Know`);
    return alerts;
    
  } catch (error) {
    console.error('Error scraping The Know:', error);
    return [];
  }
}
