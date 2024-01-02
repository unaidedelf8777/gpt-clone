// pages/api/models.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from '@/app/components/auth/SupabaseClient';

export default async function fetchModels(req: NextApiRequest, res: NextApiResponse) {
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
        const { data, error } = await supabase
            .from('models')
            .select();

        if (error) {
            console.error('Error fetching models:', error);
            return res.status(500).json({ error: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ error: 'No models found.' });
        }

        res.status(200).json(data);
    } catch (error: any) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error occurred: ' + error.message });
    }
}