import type { LinkNode } from '@prezly/slate-types';
import type { Text } from 'slate';

import { ElementType } from '../types';

export function createLink(href: string, children: Text[] = []): LinkNode {
    return {
        children,
        href,
        type: ElementType.LINK,
    };
}
