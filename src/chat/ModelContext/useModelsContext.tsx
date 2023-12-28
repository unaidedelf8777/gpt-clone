
import { useContext } from 'react';
import { ModelsContext } from './ModelsContext';

export const useModels = () => useContext(ModelsContext);