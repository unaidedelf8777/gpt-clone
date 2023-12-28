// src/chat/useCurrentModel.tsx
import { useContext } from 'react';
import { CurrentModelContext } from './ModelContext';

export const useCurrentModel = () => useContext(CurrentModelContext);