import classNames from 'classnames';
import React from 'react';
import { Label, MenuItem } from 'react-bootstrap';

import { noop } from '#lodash';

import { isComponent } from '../lib';
import type { Option } from '../types';

import './ClassicDropdown.scss';

interface Props<Action> {
    className?: string;
    options: Option<Action>[];
    onItemClick: (option: Option<Action>) => void;
    open: boolean;
    selectedOption: Option<Action>;
}

/**
 * @deprecated Will be replaced by `ModernDropdown` once we release it for everyone.
 */
export function ClassicDropdown<Action>({
    className,
    options,
    onItemClick,
    open,
    selectedOption,
}: Props<Action>) {
    return (
        <div
            className={classNames('dropdown', 'editor-v4-floating-menu-classic-dropdown', { open })}
        >
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <ul
                className={classNames(
                    'dropdown-menu',
                    'editor-v4-floating-menu-classic-dropdown__menu',
                    className,
                )}
                onMouseDown={(event) => event.preventDefault()}
            >
                {options.length === 0 && (
                    <MenuItem
                        className="editor-v4-floating-menu-classic-dropdown__menu-item"
                        disabled
                        onClick={noop}
                    >
                        Nothing found.
                    </MenuItem>
                )}

                {options.map((option) => (
                    <MenuItem
                        active={option === selectedOption}
                        className="editor-v4-floating-menu-classic-dropdown__menu-item"
                        key={option.text}
                        onClick={(event) => event.preventDefault()}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            onItemClick(option);
                        }}
                    >
                        {isComponent(option.icon) ? (
                            <option.icon className="editor-v4__floating-add-menu-icon" />
                        ) : (
                            option.icon
                        )}
                        {option.text}
                        {(option.isBeta || option.isNew) && (
                            <Label
                                bsStyle={option.isBeta ? 'warning' : 'success'}
                                className="editor-v4-floating-menu-classic-dropdown__label"
                            >
                                {option.isBeta ? 'IN TESTING' : 'NEW'}
                            </Label>
                        )}
                    </MenuItem>
                ))}
            </ul>
        </div>
    );
}
