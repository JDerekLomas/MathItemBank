import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(_request: NextRequest) {
  try {
    // Read the enhanced item bank data
    const itemBankPath = path.join(process.cwd(), 'enhanced-item-bank.json');
    const subskillsPath = path.join(process.cwd(), 'subskills.csv');

    let itemBankData = null;
    let subskillsData = [];

    try {
      const itemBankContent = await fs.readFile(itemBankPath, 'utf-8');
      itemBankData = JSON.parse(itemBankContent);
    } catch (error) {
      console.warn('Enhanced item bank not found, using sample data');
      // Fallback to sample data
      const samplePath = path.join(process.cwd(), 'sample-item-bank.json');
      const sampleContent = await fs.readFile(samplePath, 'utf-8');
      itemBankData = JSON.parse(sampleContent);
    }

    try {
      const subskillsContent = await fs.readFile(subskillsPath, 'utf-8');
      const lines = subskillsContent.split('\n');
      const headers = lines[0].split(',');

      subskillsData = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',');
          const subskill: any = {};
          headers.forEach((header, index) => {
            subskill[header.trim()] = values[index]?.trim().replace(/"/g, '') || '';
          });
          return subskill;
        });
    } catch (error) {
      console.warn('Subskills CSV not found');
    }

    const response = {
      standards: itemBankData?.standards || [],
      items: itemBankData?.items || [],
      subskills: subskillsData,
      metadata: itemBankData?.metadata || {}
    };

    // Add CORS headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error serving data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to load data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}