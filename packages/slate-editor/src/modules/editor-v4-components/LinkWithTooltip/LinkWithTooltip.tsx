import type { FunctionComponent } from 'react';
import React from 'react';

import { TooltipV2 } from '#components';

import './LinkWithTooltip.scss';

// introduced so that the tooltip does not disappear while
// user is moving their mouse over from target to the tooltip
const HIDE_DELAY = 300;

// introduced so that tooltip does not appear while user is selecting text
const SHOW_DELAY = 150;

interface Props {
    children: TooltipV2.TooltipProps['children'];
    enabled?: boolean;
    href: string;
}

export const LinkWithTooltip: FunctionComponent<Props> = ({ children, enabled = true, href }) => (
    <TooltipV2.Tooltip
        className="editor-v4-link-with-tooltip"
        enabled={enabled}
        hideDelay={HIDE_DELAY}
        placement="bottom"
        showDelay={SHOW_DELAY}
        tooltip={
            <a
                className="editor-v4-link-with-tooltip__link"
                href={href}
                rel="noreferrer noopener"
                target="_blank"
            >
                {href}
            </a>
        }
    >
        {children}
    </TooltipV2.Tooltip>
);
