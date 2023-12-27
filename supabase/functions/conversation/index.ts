import { createClient, SupabaseClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://fpzrwxvhyvshkjpffzon.supabase.co';

console.log(`Server running!`);

Deno.serve(async (req) => {
  // Only allow GET requests to this endpoint
  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Extract the Bearer token from the Authorization header
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Assumes "Bearer YOUR_TOKEN"

  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Create a new Supabase client for the current user
  const userSupabase = createClient(supabaseUrl, token);

  const url = new URL(req.url);
  // Check if the URL is in the correct format: /conversation/{conv_id}
  if (url.pathname.startsWith('/conversation/') && url.pathname.split('/').length === 3) {
    const convId = url.pathname.split('/').pop();
    
    if (convId) {
      try {
        // Attempt to fetch messages for the conversation that belongs to the user
        const { data, error } = await userSupabase
          .from('messages')
          .select('*')
          .eq('chat_id', convId)
          .order('created_at', { ascending: true });

        if (error) throw new Error(error.message);

        // Verify if there are messages and if they belong to the user
        if (data && data.length > 0) {
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
          });
        } else {
          return new Response('No messages found or you do not have access to this conversation', { status: 404 });
        }
      } catch (err) {
        console.error('Error fetching conversation messages:', err);
        return new Response(err.message, { status: 500 });
      }
    }
  }

  return new Response('Not Found', { status: 404 });
}, { addr: ':8080' });

console.log(`Server listening on http://localhost:8080`);
