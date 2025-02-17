import { Transforms } from 'slate';
import type { Editor } from 'slate';

import { isImageCandidateElement } from '#modules/editor-v4-image';

export function withoutImageCandidates(editor: Editor): void {
    Transforms.removeNodes(editor, {
        at: [],
        match: isImageCandidateElement,
    });
}
