import type { Coverage } from '@prezly/sdk';
import type { ReactNode, RefObject } from 'react';

export interface CoverageExtensionParameters {
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    fetchCoverage: (id: Coverage['id']) => Promise<Coverage>;
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export interface CoverageParameters extends CoverageExtensionParameters {
    containerRef: RefObject<HTMLElement>;
}

export interface SearchProps {
    onChange: (query: string) => void;
    onSubmit: (coverage: Coverage) => void;
}
