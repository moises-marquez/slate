import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';

import type { MentionElementType } from './types';

interface Options<T extends string> {
    id: Extension['id'];
    normalizers: Extension['normalizers'];
    parseSerializedElement: (serialized: string) => MentionElementType | undefined;
    renderElement: Extension['renderElement'];
    type: T;
}

export function MentionsExtension<T extends string>({
    id,
    normalizers,
    parseSerializedElement,
    renderElement,
    type,
}: Options<T>): Extension {
    return {
        deserialize: {
            element: {
                [type]: createDeserializeElement(parseSerializedElement),
            },
        },
        id,
        inlineTypes: [type],
        normalizers,
        renderElement,
        voidTypes: [type],
    };
}
