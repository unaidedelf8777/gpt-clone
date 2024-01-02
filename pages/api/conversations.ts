import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from '@/app/components/auth/SupabaseClient';

export default async function fetchUserConversations(req: NextApiRequest, res: NextApiResponse) {
    // Parse limit and offset from the query parameters
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({ error: 'Invalid limit value. It should be a positive integer.' });
    }

    if (isNaN(offset) || offset < 0) {
        return res.status(400).json({ error: 'Invalid offset value. It should be a non-negative integer.' });
    }

    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing.' });
    }

    // Initialize a new Supabase client for each request using the Authorization header
    const supabase = createClient(
        supabaseUrl,
        supabaseAnonKey,
        { global: { headers: { Authorization: authHeader } } }
    );

    try {
        const { data, error, count } = await supabase
            .from('chats')
            .select('*', { count: 'exact' })
            .order('updated_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            console.error('Error fetching conversations:', error);
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No conversations found.' });
        }

        res.status(200).json({
            items: data,
            total: count,
            limit,
            offset,
            has_missing_conversations: false
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: 'Unexpected error occurred: ' + error.message });
        } else {
            res.status(500).json({ error: 'Unexpected error occurred.' });
        }
    }
}
