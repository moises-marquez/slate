import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

export interface Props extends Partial<LinkProps> {
    className?: string;
    disabled?: boolean;
    href: string;
}

export const SpaLink: FunctionComponent<Props> = ({
    children,
    className,
    disabled,
    href,
    ...props
}) => (
    <Link
        className={classNames('editor-menu__link', className, {
            'editor-menu__link--disabled': disabled,
        })}
        to={href}
        {...props}
    >
        {children}
    </Link>
);
