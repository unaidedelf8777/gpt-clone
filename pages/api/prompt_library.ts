import fs from 'fs';
import path from 'path';
import seedrandom from 'seedrandom';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const offset = Number(req.query.offset) || 0;
  const total = Number(req.query.total) || 0;

  // Read the prompts.json file
  const data = fs.readFileSync(path.resolve('./prompts.json')).toString();
  const prompts = JSON.parse(data);

  // Generate a seed for the random number generator
  const seed = (offset + total + Math.floor(Math.random() * 1000)) / 2;
  const rng = seedrandom(seed.toString());

  // Generate a random selection of prompts
  const selectedPrompts = [];
  for (let i = 0; i < total; i++) {
    const index = Math.floor(rng() * prompts.length);
    selectedPrompts.push(prompts[index]);
  }

  // Return the selected prompts
  res.status(200).json(selectedPrompts);
}