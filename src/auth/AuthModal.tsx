// AuthModal.tsx
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from './SupabaseClient';

const AuthModal: React.FC = () => {
    return (
        <div className="backdrop-blur-sm flex justify-center items-center z-50 w-full h-full">
            <div className="rounded-lg mx-4 my-8 p-4 bg-black shadow-lg w-full max-w-md">
                <Auth supabaseClient={supabase}
                    appearance={{
                        theme: ThemeSupa,
                        extend: true,
                    }}
                    providers={['google', 'github']}
                    theme="dark"
                />
            </div>
        </div>
    );
};

export default AuthModal;
