import {KeyContext, KeyContextProps} from './KeyContext';
import { useContext } from 'react';


export const useKey = (): KeyContextProps => {
    const context = useContext(KeyContext);
    if (!context) {
      throw new Error('useKey must be used within a KeyProvider');
    }
    return context;
  };