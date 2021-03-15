import { EditorCommands } from '@prezly/slate-commons';
import RangeFix from 'rangefix';
import React, { FunctionComponent, ReactNode, useEffect, useRef } from 'react';
import { MenuItem } from 'react-bootstrap';
import { Range } from 'slate';
import { useSlate } from 'slate-react';

import { ensureChildInView } from 'lib';

import { Option } from '../../types';

interface Props<V> {
    index: number;
    onOptionClick: (option: Option<V>) => void;
    options: Option<V>[];
    renderOption: (option: Option<V>) => ReactNode;
    target: Range | null;
}

const AUTO_SCROLL_SAFETY_MARGIN = 4;

const MentionsDropdown = <V extends object>({
    index,
    onOptionClick,
    options,
    renderOption,
    target,
}: Props<V>): ReturnType<FunctionComponent<V>> => {
    const editor = useSlate();
    const suggestionsPanelRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        ensureChildInView(suggestionsPanelRef.current, index, AUTO_SCROLL_SAFETY_MARGIN);
    }, [index, suggestionsPanelRef]);

    useEffect(() => {
        if (target && options.length > 0 && suggestionsPanelRef.current) {
            const domRange = EditorCommands.toDomRange(editor, target);

            if (!domRange) {
                return;
            }

            const rect = RangeFix.getBoundingClientRect(domRange);

            if (!rect) {
                return;
            }

            const { left, height, top } = rect;
            suggestionsPanelRef.current.style.top = `${top + window.pageYOffset + height}px`;
            suggestionsPanelRef.current.style.left = `${left + window.pageXOffset}px`;
        }
    }, [editor, index, options.length, target]);

    if (!target || options.length === 0) {
        return null;
    }

    return (
        <ul
            className="editor-v4-mentions-dropdown dropdown-menu"
            onMouseDown={(event) => event.preventDefault()}
            ref={suggestionsPanelRef}
            role="menu"
        >
            {options.map((option, optionIndex) => (
                <MenuItem
                    active={index === optionIndex}
                    className="editor-v4-mentions-dropdown__item"
                    key={option.id}
                    onClick={() => onOptionClick(option)}
                >
                    {renderOption(option)}
                </MenuItem>
            ))}
        </ul>
    );
};

export default MentionsDropdown;
