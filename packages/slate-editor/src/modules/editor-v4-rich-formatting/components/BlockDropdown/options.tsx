import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';

// eslint-disable-next-line import/named
import type { Menu } from '#components';

import type { BlockType } from '../../types';
import { ElementType } from '../../types';
import { MenuOption } from '../MenuOption';

export const OPTIONS: Menu.DropdownOption<BlockType>[] = [
    { hidden: true, label: 'Multiple', value: 'multiple' },
    {
        label: 'Paragraph',
        value: PARAGRAPH_NODE_TYPE,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--paragraph"
                type={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
    {
        label: 'Heading 1',
        value: ElementType.HEADING_ONE,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--heading-1"
                type={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
    {
        label: 'Heading 2',
        value: ElementType.HEADING_TWO,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--heading-2"
                type={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
    {
        label: 'Unordered List',
        value: ElementType.BULLETED_LIST,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--unordered-list"
                type={option.value}
            >
                <li>{option.label}</li>
            </MenuOption>
        ),
    },
    {
        label: 'Ordered List',
        value: ElementType.NUMBERED_LIST,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--ordered-list"
                type={option.value}
            >
                <li>{option.label}</li>
            </MenuOption>
        ),
    },
    {
        label: '“Quote”',
        value: ElementType.BLOCK_QUOTE,
        render: (option) => (
            <MenuOption
                className="editor-menu-dropdown__menu-option--blockquote"
                type={option.value}
            >
                {option.label}
            </MenuOption>
        ),
    },
];
