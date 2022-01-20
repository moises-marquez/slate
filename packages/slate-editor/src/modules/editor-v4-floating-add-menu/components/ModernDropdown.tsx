import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import { MenuItem } from 'react-bootstrap';

import { noop } from '#lodash';

import { groupOptions, isComponent } from '../lib';
import type { Option } from '../types';

import './ModernDropdown.scss';

interface Props<Action> {
    className?: string;
    highlight?: string;
    options: Option<Action>[];
    onItemClick: (option: Option<Action>) => void;
    open: boolean;
    selectedOption: Option<Action>;
}

export function ModernDropdown<Action>({
    className,
    highlight,
    options,
    onItemClick,
    open,
    selectedOption,
}: Props<Action>) {
    const groups = useMemo(() => groupOptions(options), [options.length, ...options]);
    return (
        <div
            className={classNames('dropdown', 'editor-v4-floating-menu-modern-dropdown', { open })}
        >
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <ul
                className={classNames(
                    'dropdown-menu',
                    'editor-v4-floating-menu-modern-dropdown__menu',
                    className,
                )}
                onMouseDown={(event) => event.preventDefault()}
            >
                {options.length === 0 && (
                    <MenuItem
                        className="editor-v4-floating-menu-modern-dropdown__menu-item"
                        disabled
                        onClick={noop}
                    >
                        Nothing found.
                    </MenuItem>
                )}

                {groups.map(({ group, options }) => (
                    <>
                        <MenuItem
                            className="editor-v4-floating-menu-modern-dropdown__menu-group"
                            header
                        >
                            {group}
                        </MenuItem>
                        {options.map((option) => (
                            <MenuItem
                                active={option === selectedOption}
                                className="editor-v4-floating-menu-modern-dropdown__menu-item"
                                key={option.text}
                                onClick={(event) => event.preventDefault()}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    onItemClick(option);
                                }}
                            >
                                <div className="editor-v4-floating-menu-modern-dropdown__menu-item-icon" data-action={option.action}>
                                    {isComponent(option.icon) ? <option.icon /> : option.icon}
                                </div>
                                <div className="editor-v4-floating-menu-modern-dropdown__menu-item-text">
                                    <div className="editor-v4-floating-menu-modern-dropdown__menu-item-title">
                                        <Highlight search={highlight}>{option.text}</Highlight>
                                    </div>
                                    <div className="editor-v4-floating-menu-modern-dropdown__menu-item-description">
                                        <Highlight search={highlight}>
                                            {option.description || ''}
                                        </Highlight>
                                    </div>
                                </div>
                            </MenuItem>
                        ))}
                    </>
                ))}
            </ul>
        </div>
    );
}

function Highlight({ children: text, search }: { children: string; search?: string }) {
    if (!text || !search) {
        return <>{text}</>;
    }

    const nodes: ReactNode[] = [];
    let offset = 0;

    text.toLowerCase()
        .split(search.toLowerCase())
        .forEach((substring, index) => {
            if (index === 0) {
                nodes.push(text.substr(offset, substring.length));
                offset += substring.length;
            } else {
                nodes.push(<em>{text.substr(offset, search.length)}</em>)
                nodes.push(text.substr(offset + search.length, substring.length));
                offset += search.length + substring.length;
            }
        });

    return <>{nodes}</>;
}
