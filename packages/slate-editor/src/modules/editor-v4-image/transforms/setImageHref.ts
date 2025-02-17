import type { ImageNode } from '@prezly/slate-types';
import type { Editor, Range } from 'slate';
import { Transforms } from 'slate';

export function setImageHref(editor: Editor, at: Range, href: string) {
    return Transforms.setNodes<ImageNode>(editor, { href }, { at });
}
