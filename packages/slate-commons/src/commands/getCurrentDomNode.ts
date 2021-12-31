import type { Editor } from 'slate';

import getCurrentNodeEntry from './getCurrentNodeEntry';
import toDomNode from './toDomNode';

function getCurrentDomNode(editor: Editor): HTMLElement | null {
    const [currentNode] = getCurrentNodeEntry(editor) || [];

    if (!currentNode) {
        return null;
    }

    return toDomNode(editor, currentNode);
}

export default getCurrentDomNode;
