import React, { useState, useEffect, useRef} from 'react';
import { Tables } from '../types/database.types';
import { useCurrentModel } from './ModelContext/useModelContext';
import { useModels } from './ModelContext/useModelsContext';

type Model = Tables<'models'>;

const ModelSelector = () => {
    const models = useModels();
    const { selectedModel, setSelectedModel } = useCurrentModel();
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown


    // Automatically select the first model by default if not already selected
    useEffect(() => {
        if (models.length > 0 && !selectedModel) {
            setSelectedModel(models[0]);
        }
    }, [models, selectedModel]); // ignore.

    useEffect(() => {
        // Function to check if the click is outside the dropdown
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]); // Empty array ensures this only runs on mount and unmount

    const handleSelectModel = (model: Model) => {
        setSelectedModel(model);
        setIsOpen(false);
    };

    return (
        <div className="relative font-semibold" style={{ position: 'relative' }} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex cursor-pointer items-center gap-1 rounded-xl  mt-2 ml-2 py-2 px-3 text-lg text-white font-medium hover:bg-gray-50 radix-state-open:bg-gray-50 dark:hover:bg-black/10 dark:radix-state-open:bg-black/20"
                style={{ minWidth: 'fit-content' }}
            >
                <span>{selectedModel ? `${selectedModel['model-display-name']}` : 'Select a model'}</span>
                <svg
                    width={16}
                    height={17}
                    viewBox="0 0 16 17"
                    fill="none"
                    className="text-token-text-tertiary"
                >
                    <path
                        d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute ml-2 mt-2 min-w-[340px] max-w-xs overflow-hidden rounded-lg border border-gray-100 bg-token-surface-primary shadow-lg dark:border-gray-700 z-20 cursor-pointer">
                    <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {models.map((model) => (
                            <div
                                key={model['model-slug']}
                                className="px-4 py-2 text-sm mr-2 ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 "
                                role="menuitem"
                                onClick={() => handleSelectModel(model)}
                            >
                                <div className="font-medium text-white">{model['model-display-name']}</div>
                                <div className="text-gray-500">{model.descriptor}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default ModelSelector ;
