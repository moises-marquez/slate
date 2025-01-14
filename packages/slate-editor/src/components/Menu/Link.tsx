import classNames from 'classnames';
import type { AnchorHTMLAttributes, FunctionComponent } from 'react';
import React from 'react';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    disabled?: boolean;
}

export const Link: FunctionComponent<Props> = ({ children, className, disabled, ...props }) => (
    <a
        {...props}
        className={classNames('editor-menu__link', className, {
            'editor-menu__link--disabled': disabled,
        })}
    >
        {children}
    </a>
);
