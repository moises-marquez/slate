import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Element, Location } from 'slate';

import { LOADER_TYPE } from '../constants';

export default function removeLoader(editor: Editor, at?: Location): void {
    EditorCommands.removeNode(editor, {
        at,
        match: (node) => Element.isElement(node) && node.type === LOADER_TYPE,
    });
}
