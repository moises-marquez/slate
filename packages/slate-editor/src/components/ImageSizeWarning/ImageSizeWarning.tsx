import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import * as TooltipV2 from '../TooltipV2';

import './ImageSizeWarning.scss';

export interface Props {
    className?: string;
}

const WARNING =
    'Your image has higher resolution than recommended and might not be rendered properly or even may not be rendered at all.';

export const ImageSizeWarning: FunctionComponent<Props> = ({ className }) => (
    <TooltipV2.Tooltip tooltip={WARNING}>
        {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
            <div
                {...ariaAttributes}
                className={classNames('image-size-warning', className)}
                onMouseEnter={onShow}
                onMouseLeave={onHide}
                ref={setReferenceElement}
            >
                <i className="icon icon-warning2" />
            </div>
        )}
    </TooltipV2.Tooltip>
);
