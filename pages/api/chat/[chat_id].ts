// pages/api/chats/[chat_id].js

import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from '@/app/components/auth/SupabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
});

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { chat_id } = req.query;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing.' });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
    });

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('chat_id', chat_id)
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(200).json(data);
    } else if (req.method === 'PATCH') {
        const { title, model_slug } = req.body;

        const { data, error } = await supabase
            .from('chats')
            .update({ title, model_slug })
            .eq('chat_id', chat_id)
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    } else if (req.method === 'POST') {
        const { messages } = req.body;

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: messages,
        });

        const { data, error } = await supabase
            .from('chats')
            .insert([{ chat_id, response: response.data.choices[0].message.content }])
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json(data);
    } else {
        return res.status(405).json({ error: `Method ${req.method} not allowed. ` });
    }
}
