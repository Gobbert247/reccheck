// NSW Health scraper - Authoritative state health department
import axios from 'axios';
import * as cheerio from 'cheerio';
import { DrugAlert } from './theKnow';

export async function scrapeNSWHealth(): Promise<DrugAlert[]> {
  const alerts: DrugAlert[] = [];
  
  try {
    console.log('Fetching alerts from NSW Health...');
    const response = await axios.get(
      'https://www.health.nsw.gov.au/aod/public-drug-alerts/Pages/default.aspx',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    );
    
    const $ = cheerio.load(response.data);
    
    // Parse drug warning links from NSW Health page
    $('a[href*="public-drug-alerts"]').each((index, element) => {
      try {
        const $link = $(element);
        const href = $link.attr('href') || '';
        const title = $link.text().trim();
        
        // Skip non-alert links
        if (!title || title.length < 10 || !href.includes('public-drug-alerts')) {
          return;
        }
        
        const fullUrl = href.startsWith('http') 
          ? href 
          : `https://www.health.nsw.gov.au${href}`;
        
        // Extract date from text (format: "[Issued 15 December 2025]")
        const dateMatch = $link.parent().text().match(/\[?[Ii]ssued\s+(\d{1,2}\s+\w+\s+\d{4})\]?/);
        const dateText = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
        
        // Extract substance from title
        const substance = title.split(' ')[0] || 'Unknown';
        
        // NSW Health alerts are typically high severity
        const severity: 'high' | 'medium' | 'low' = 'high';
        
        alerts.push({
          id: `nswhealth-${Date.now()}-${index}`,
          title,
          substance,
          location: 'NSW',
          date: dateText,
          severity,
          description: `Public drug warning: ${title}`,
          source: 'NSW Health',
          sourceUrl: fullUrl
        });
      } catch (err) {
        console.warn('Error parsing NSW Health alert:', err);
      }
    });
    
    console.log(`Scraped ${alerts.length} alerts from NSW Health`);
    return alerts;
    
  } catch (error) {
    console.error('Error scraping NSW Health:', error);
    return [];
  }
}
