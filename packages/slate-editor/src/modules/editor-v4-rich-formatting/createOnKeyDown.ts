import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { lists } from './lists';
import type { RichFormattingExtensionParameters } from './types';
import { MarkType } from './types';

const MARK_HOTKEYS: { hotkey: string; mark: MarkType }[] = [
    { hotkey: 'mod+b', mark: MarkType.BOLD },
    { hotkey: 'mod+i', mark: MarkType.ITALIC },
    { hotkey: 'mod+u', mark: MarkType.UNDERLINED },
];

function marksOnKeyDown(event: KeyboardEvent, editor: Editor) {
    return MARK_HOTKEYS.forEach(({ hotkey, mark }) => {
        if (isHotkey(hotkey, event.nativeEvent)) {
            event.preventDefault();
            EditorCommands.toggleMark(editor, mark);
        }
    });
}

function listsOnKeyDown(event: KeyboardEvent, editor: Editor) {
    const listItemsInSelection = lists.getListItemsInRange(editor, editor.selection);

    // Since we're overriding the default Tab key behavior
    // we need to bring back the possibility to blur the editor
    // with keyboard.
    if (isHotkey('esc', event.nativeEvent)) {
        event.preventDefault();
        ReactEditor.blur(editor);
    }

    if (isHotkey('tab', event.nativeEvent)) {
        event.preventDefault();
        lists.increaseDepth(editor);
    }

    if (isHotkey('shift+tab', event.nativeEvent)) {
        event.preventDefault();
        lists.decreaseDepth(editor);
    }

    if (isHotkey('backspace', event.nativeEvent) && !lists.canDeleteBackward(editor)) {
        event.preventDefault();
        lists.decreaseDepth(editor);
    }

    if (isHotkey('enter', event.nativeEvent)) {
        if (lists.isCursorInEmptyListItem(editor)) {
            event.preventDefault();
            lists.decreaseDepth(editor);
        } else if (listItemsInSelection.length > 0) {
            event.preventDefault();
            lists.splitListItem(editor);
        }
    }
}

function softBreakOnKeyDown(event: KeyboardEvent, editor: Editor) {
    if (isHotkey('shift+enter', event.nativeEvent) && !event.isDefaultPrevented()) {
        event.preventDefault();
        Editor.insertText(editor, '\n');
    }
}

export function createOnKeyDown(parameters: RichFormattingExtensionParameters) {
    return (event: KeyboardEvent, editor: Editor) => {
        softBreakOnKeyDown(event, editor);
        marksOnKeyDown(event, editor);

        if (parameters.blocks) {
            listsOnKeyDown(event, editor);

            // Slate does not always trigger normalization when one would expect it to.
            // So we want to force it after we perform lists operations, as it fixes
            // many unexpected behaviors.
            // https://github.com/ianstormtaylor/slate/issues/3758
            Editor.normalize(editor, { force: true });
        }
    };
}
