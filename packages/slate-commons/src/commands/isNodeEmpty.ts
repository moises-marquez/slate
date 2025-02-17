import type { Node } from 'slate';
import { Editor, Text } from 'slate';

export function isNodeEmpty(editor: Editor, node: Node): boolean {
    if (Text.isText(node)) {
        return node.text.length === 0;
    }

    if (Editor.isEditor(node)) {
        return (
            node.children.length <= 1 && node.children.every((child) => isNodeEmpty(editor, child))
        );
    }

    return Editor.isEmpty(editor, node);
}
