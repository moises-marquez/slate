import type { AttachmentNode } from '@prezly/slate-types';
import { isAttachmentNode } from '@prezly/slate-types';

import createFileAttachment from './createFileAttachment';

function parseSerializedElement(serialized: string): AttachmentNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isAttachmentNode(parsed)) {
        return createFileAttachment(parsed.file, parsed.description);
    }

    return undefined;
}

export default parseSerializedElement;
