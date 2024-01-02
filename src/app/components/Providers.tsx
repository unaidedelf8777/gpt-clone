"use client";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { ChatProvider } from './sidebar/ChatContext';
import { CurrentModelProvider } from './chat/ModelContext/ModelContext';
import { ModelsProvider } from './chat/ModelContext/ModelsContext';
import { SessionProvider } from './auth/AuthContext';
import { AvatarProvider } from './user/AvatarContext';
import { KeyProvider } from './KeyContext';
import ThemeScript from './Theme';

interface ProvidersProps {
    children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => (
    <SessionProvider>
        <Router>
            <KeyProvider>
                <AvatarProvider>
                    <ModelsProvider>
                        <CurrentModelProvider>
                            <ChatProvider>
                                <>
                                    <ThemeScript />
                                </>
                                {children}
                            </ChatProvider>
                        </CurrentModelProvider>
                    </ModelsProvider>
                </AvatarProvider>
            </KeyProvider>
        </Router>
    </SessionProvider>
);

export default Providers;