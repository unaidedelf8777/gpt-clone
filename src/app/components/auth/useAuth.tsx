import { useContext } from 'react';
import { SessionContext } from './AuthContext';

export const useAuth = () => {
    const [session, setSession] = useContext(SessionContext);
    return { session, setSession };
};