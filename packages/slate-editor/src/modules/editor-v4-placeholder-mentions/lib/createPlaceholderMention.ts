import type { PlaceholderKey, PlaceholderNode } from '@prezly/slate-types';
import { PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';

export function createPlaceholderMention(key: PlaceholderKey): PlaceholderNode {
    return {
        children: [{ text: '' }],
        key,
        type: PLACEHOLDER_NODE_TYPE,
    };
}
