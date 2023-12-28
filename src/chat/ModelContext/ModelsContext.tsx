// src/chat/ModelContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Tables } from '../../types/database.types';
import { supabase } from '../../auth/SupabaseClient';

type Model = Tables<'models'>;

// Create a context for the models
const ModelsContext = createContext<Model[]>([]);

// Create a provider component that fetches the models
const ModelsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        const fetchModels = async () => {
            const { data, error } = await supabase
                .from('models')
                .select();
            if (error) {
                console.error('Error fetching models:', error);
            } else {
                setModels(data || []);
            }
        };

        fetchModels();
    }, []);

    return (
        <ModelsContext.Provider value={models}>
            {children}
        </ModelsContext.Provider>
    );
};

export { ModelsContext, ModelsProvider };
