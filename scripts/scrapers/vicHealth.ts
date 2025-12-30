// VIC Health scraper - Authoritative state health department
import axios from 'axios';
import * as cheerio from 'cheerio';
import { DrugAlert } from './theKnow';

export async function scrapeVICHealth(): Promise<DrugAlert[]> {
  const alerts: DrugAlert[] = [];
  
  try {
    console.log('Fetching alerts from VIC Health...');
    const response = await axios.get(
      'https://www.health.vic.gov.au/alcohol-and-drugs/drug-alerts',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );
    
    const $ = cheerio.load(response.data);
    
    // Parse drug alert articles from VIC Health page
    $('article').each((index, element) => {
      try {
        const $article = $(element);
        
        // Extract title
        const title = $article.find('h3, h2').first().text().trim();
        
        // Extract link
        const $link = $article.find('a').first();
        const href = $link.attr('href') || '';
        const fullUrl = href.startsWith('http') 
          ? href 
          : `https://www.health.vic.gov.au${href}`;
        
        // Extract date - VIC Health may embed dates in text or metadata
        const dateText = $article.find('time').text().trim() || 
                        $article.text().match(/\d{1,2}\s+\w+\s+\d{4}/)?.[0] ||
                        new Date().toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        });
        
        // Extract description
        const description = $article.find('p').first().text().trim() || title;
        
        // Extract substance from title
        const substance = title.split(' ')[0] || 'Unknown';
        
        // VIC Health alerts are typically high severity
        const severity: 'high' | 'medium' | 'low' = 'high';
        
        if (title && title.length > 5) {
          alerts.push({
            id: `vichealth-${Date.now()}-${index}`,
            title,
            substance,
            location: 'VIC',
            date: dateText,
            severity,
            description: description.substring(0, 200),
            source: 'VIC Health',
            sourceUrl: fullUrl
          });
        }
      } catch (err) {
        console.warn('Error parsing VIC Health alert:', err);
      }
    });
    
    console.log(`Scraped ${alerts.length} alerts from VIC Health`);
    return alerts;
    
  } catch (error) {
    console.error('Error scraping VIC Health:', error);
    return [];
  }
}
