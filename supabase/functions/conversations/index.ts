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

  // Get pagination parameters from the URL query
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  try {
    // Fetch conversations for the authenticated user with pagination
    const { data, error, count } = await userSupabase
      .from('chats')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false }) // Order by updated_at descending
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching conversations:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    // Respond with the paginated conversations data
    const responseBody = {
      items: data,
      total: count,
      limit: limit,
      offset: offset,
      has_missing_conversations: false // Placeholder, can be set based on logic
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
}, { addr: ':8080' });

