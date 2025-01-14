import type { Element, NodeEntry } from 'slate';
import { Editor, Path, Range } from 'slate';

import type { ListsOptions } from '../types';

import { isListItem } from './isListItem';

/**
 * Returns all "list-items" in a given Range.
 * @param at defaults to current selection if not specified
 */
export function getListItemsInRange(
    options: ListsOptions,
    editor: Editor,
    at: Range | null | undefined,
): NodeEntry<Element>[] {
    if (!at) {
        return [];
    }

    const rangeStartPoint = Range.start(at);
    const listItemsInSelection = Editor.nodes(editor, {
        at,
        match: (node) => isListItem(options, node),
    });

    return Array.from(listItemsInSelection).filter(([, path]) => {
        const [, grandparent] = Path.ancestors(rangeStartPoint.path, { reverse: true });
        const rangeIsGrandhild = Path.equals(path, grandparent);
        const rangeIsDescendant = Path.isDescendant(rangeStartPoint.path, path);
        const rangeStartsAfter = Path.isAfter(rangeStartPoint.path, path);

        if (rangeIsDescendant) {
            // There's just one case where we want to include a "list-item" that is
            // an ancestor of the range starting point - when it's a grandparent of that point.
            // It's because the selection starting point will be in a grandchild `{ text: '' }` node.
            // <h-li>                       <--- grandparent
            //     <h-li-text>
            //         <h-text>             <--- grandchild
            //             <anchor />       <--- range starting point
            //         </h-text>
            //     </h-li-text>
            // </h-li>
            // Other ancestors are not "visually" in selection, but they are returned by `Editor.nodes`.
            return !rangeStartsAfter && rangeIsGrandhild;
        }

        return !rangeStartsAfter;
    }) as NodeEntry<Element>[];
}
