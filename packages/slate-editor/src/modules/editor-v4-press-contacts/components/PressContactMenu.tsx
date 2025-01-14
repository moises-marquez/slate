import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import { useSelected, useSlate } from 'slate-react';

import { Menu } from '#components';
import { Delete } from '#icons';

import { EventsEditor } from '#modules/editor-v4-events';

import { removePressContact } from '../lib';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
}

export const PressContactMenu: FunctionComponent<Props> = ({ element, containerRef }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    if (!isSelected) {
        return null;
    }

    function handleRemove() {
        const removedElement = removePressContact(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'contact-removed', {
                contact_id: removedElement.contact.id,
            });
        }
    }

    return (
        <Menu.FloatingMenu containerRef={containerRef} element={element}>
            <Menu.ButtonGroup>
                <Menu.Button onMouseDown={handleRemove} title="Delete contact" variant="danger">
                    <Menu.Icon icon={Delete} />
                </Menu.Button>
            </Menu.ButtonGroup>
        </Menu.FloatingMenu>
    );
};
