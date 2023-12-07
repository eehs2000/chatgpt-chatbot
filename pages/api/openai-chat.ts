import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  organization: 'org-uxDpP5ebNUmoyyH69LDjikZl',
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function openaiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { message } = req.body;
    console.log(message);
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'ask me anything you want to know!' },
          { role: 'user', content: `${message}` },
        ],
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
      });
      res.status(200).json({ data: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing your request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
