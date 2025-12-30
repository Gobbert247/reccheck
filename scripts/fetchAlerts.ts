// RecCheck Alert Orchestrator
// Coordinates all scraper modules and generates unified alerts.json

import { scrapeTheKnow, DrugAlert } from './scrapers/theKnow';
import { scrapeNSWHealth } from './scrapers/nswHealth';
import { scrapeVICHealth } from './scrapers/vicHealth';
import fs from 'fs';
import path from 'path';

const OUTPUT_PATH = path.join(__dirname, '../data/generated/alerts.json');

interface AlertStats {
  total: number;
  bySource: Record<string, number>;
  byState: Record<string, number>;
  bySeverity: Record<string, number>;
  lastUpdated: string;
}

async function main() {
  console.log('\n🚀 RecCheck Alert Orchestrator Starting...\n');
  
  const allAlerts: DrugAlert[] = [];
  const stats: AlertStats = {
    total: 0,
    bySource: {},
    byState: {},
    bySeverity: {},
    lastUpdated: new Date().toISOString()
  };

  // Run all scrapers in parallel for efficiency
  try {
    const [theKnowAlerts, nswHealthAlerts, vicHealthAlerts] = await Promise.allSettled([
      scrapeTheKnow(),
      scrapeNSWHealth(),
      scrapeVICHealth()
    ]);

    // Process The Know results
    if (theKnowAlerts.status === 'fulfilled') {
      console.log(`✅ The Know: ${theKnowAlerts.value.length} alerts`);
      allAlerts.push(...theKnowAlerts.value);
    } else {
      console.error('❌ The Know failed:', theKnowAlerts.reason);
    }

    // Process NSW Health results
    if (nswHealthAlerts.status === 'fulfilled') {
      console.log(`✅ NSW Health: ${nswHealthAlerts.value.length} alerts`);
      allAlerts.push(...nswHealthAlerts.value);
    } else {
      console.error('❌ NSW Health failed:', nswHealthAlerts.reason);
    }

    // Process VIC Health results
    if (vicHealthAlerts.status === 'fulfilled') {
      console.log(`✅ VIC Health: ${vicHealthAlerts.value.length} alerts`);
      allAlerts.push(...vicHealthAlerts.value);
    } else {
      console.error('❌ VIC Health failed:', vicHealthAlerts.reason);
    }

    // Remove duplicates based on title and date
    const uniqueAlerts = deduplicateAlerts(allAlerts);
    
    // Sort by date (newest first)
    uniqueAlerts.sort((a, b) => {
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      } catch {
        return 0;
      }
    });

    // Calculate statistics
    stats.total = uniqueAlerts.length;
    uniqueAlerts.forEach(alert => {
      stats.bySource[alert.source] = (stats.bySource[alert.source] || 0) + 1;
      stats.byState[alert.location] = (stats.byState[alert.location] || 0) + 1;
      stats.bySeverity[alert.severity] = (stats.bySeverity[alert.severity] || 0) + 1;
    });

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(
      OUTPUT_PATH,
      JSON.stringify(uniqueAlerts, null, 2),
      'utf-8'
    );

    // Print summary
    console.log('\n📊 SCRAPING SUMMARY:');
    console.log(`   Total unique alerts: ${stats.total}`);
    console.log('\n   By Source:');
    Object.entries(stats.bySource).forEach(([source, count]) => {
      console.log(`      ${source}: ${count}`);
    });
    console.log('\n   By State:');
    Object.entries(stats.byState).forEach(([state, count]) => {
      console.log(`      ${state}: ${count}`);
    });
    console.log('\n   By Severity:');
    Object.entries(stats.bySeverity).forEach(([severity, count]) => {
      console.log(`      ${severity}: ${count}`);
    });
    console.log(`\n✅ Alerts saved to: ${OUTPUT_PATH}`);
    console.log(`🕐 Last updated: ${stats.lastUpdated}\n`);

  } catch (error) {
    console.error('❌ Fatal error in orchestrator:', error);
    process.exit(1);
  }
}

function deduplicateAlerts(alerts: DrugAlert[]): DrugAlert[] {
  const seen = new Set<string>();
  const unique: DrugAlert[] = [];

  for (const alert of alerts) {
    // Create a unique key based on title (normalized) and approximate date
    const normalizedTitle = alert.title.toLowerCase().trim();
    const key = `${normalizedTitle}-${alert.location}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(alert);
    }
  }

  return unique;
}

// Run the orchestrator
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
