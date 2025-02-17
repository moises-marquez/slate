/* eslint-disable no-param-reassign */

import {
    BULLETED_LIST_NODE_TYPE,
    DIVIDER_NODE_TYPE,
    LINK_NODE_TYPE,
    LIST_ITEM_NODE_TYPE,
    LIST_ITEM_TEXT_NODE_TYPE,
    NUMBERED_LIST_NODE_TYPE,
    PARAGRAPH_NODE_TYPE,
    isElementNode,
} from '@prezly/slate-types';
import type { Editor } from 'slate';

import { Lists } from './Lists';
import type { ListsOptions } from './types';
import { withLists } from './withLists';

export const INLINE_ELEMENT = LINK_NODE_TYPE;

export const UNWRAPPABLE_ELEMENT = DIVIDER_NODE_TYPE;

export const options: ListsOptions = {
    defaultBlockType: PARAGRAPH_NODE_TYPE,
    listItemTextType: LIST_ITEM_TEXT_NODE_TYPE,
    listItemType: LIST_ITEM_NODE_TYPE,
    listTypes: [BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE],
    wrappableTypes: [PARAGRAPH_NODE_TYPE],
};

export const lists = Lists(options);

function withInlineElement<T extends Editor>(editor: T): T {
    const { isInline } = editor;

    editor.isInline = (element) => {
        if (isElementNode(element, INLINE_ELEMENT)) {
            return true;
        }
        return isInline(element);
    };

    return editor;
}

export function createListsEditor(input: JSX.Element) {
    return withInlineElement(withLists(options)(input as unknown as Editor));
}
