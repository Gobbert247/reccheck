// pages/api/alerts.ts
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'nex/servert';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data/generated/alerts.json');

  try {
    const json = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(json);
    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Failed to read alerts.json', err);
    res.status(500).json({ error: 'Unable to load alerts' });
  }
}
