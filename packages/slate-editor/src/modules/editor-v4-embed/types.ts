import type { OEmbedInfo } from '@prezly/sdk';
import type { RefObject } from 'react';

export interface EmbedExtensionParameters {
    fetchOembed: (url: OEmbedInfo['url']) => Promise<OEmbedInfo>;
    showAsScreenshot: boolean;
}

export interface EmbedParameters extends EmbedExtensionParameters {
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
}
