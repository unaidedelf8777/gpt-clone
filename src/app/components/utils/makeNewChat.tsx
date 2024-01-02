import { supabase } from '../auth/SupabaseClient';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create a new chat and then add the first message to the database.
const createNewChat = async (id: string, firstMessage: string, modelSlug: string, userId: string) => {
  const newMessageId = uuidv4();

  // Create a new message
  const { error: messageError } = await supabase
    .from('messages')
    .insert([
      { 
        id: newMessageId, 
        chat_id: id, // Linking message to the created chat
        sender_role: 'user', 
        content: firstMessage.content,
        created_at: new Date().toISOString()
      },
    ]);

  if (messageError) {
    console.error('Error creating new message:', messageError);
    return;
  }

  // Create a new chat linked to the created message
  const { error: chatError } = await supabase
    .from('chats')
    .insert([
      { 
        chat_id: id, 
        user_id: userId,
        title: 'New Chat', 
        created_at: new Date().toISOString(), 
        updated_at: new Date().toISOString(),
        'model-slug': modelSlug,
        first_message_id: newMessageId
      },
    ]);

  if (chatError) {
    console.error('Error creating new chat:', chatError);
  }
};

console.log("Made a db record for a new chat.")
export default createNewChat;
