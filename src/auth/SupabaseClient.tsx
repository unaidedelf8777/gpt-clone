// supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://fpzrwxvhyvshkjpffzon.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwenJ3eHZoeXZzaGtqcGZmem9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2NTY3NTYsImV4cCI6MjAxNzIzMjc1Nn0.MuPihRRJ6GlcYhsGqvQorQGjbijo4SZ6iLg1lYV742o'; // Replace with your Supabase Anon Key

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
