import type { KeyboardEvent } from 'react';

import isDeletingBackward from './isDeletingBackward';
import isDeletingForward from './isDeletingForward';

function isDeleting(event: KeyboardEvent): boolean {
    return isDeletingBackward(event) || isDeletingForward(event);
}

export default isDeleting;
