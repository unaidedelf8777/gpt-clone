import { supabase } from "../auth/SupabaseClient";


async function fetchUserConversations(userId: string, limit = 10, offset = 0) {

    const { data, error, count } = await supabase
        .from('chats')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.error('Error fetching conversations:', error);
        return { error };
    }

    console.log(data)
    return new Response(JSON.stringify({
        items: data,
        total: count,
        limit,
        offset,
        has_missing_conversations: false
    }));
}
export default fetchUserConversations;