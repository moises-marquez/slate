import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { Component } from 'react';
import type { DraggableEventHandler } from 'react-draggable';
import * as Draggable from 'react-draggable';

import { Resize } from '#icons';
import { clamp, noop } from '#lodash';

import { Theme } from '#modules/themes';

import { getClampedRatioInPercent, getClampedWidthInPercent, increaseWidth } from './lib';

import './ResizableContainer.scss';

interface Props {
    className?: string;
    enabled: boolean;
    maxWidth: number;
    minWidth: number;
    onResize: (widthPercent: string, widthFactor: string) => void;
    onResizeStop?: () => void;
    resizingClassName?: string;
    style?: CSSProperties | null;
    theme: Theme;
    width: number;
    widthFactor: string;
    widthPercent: string;
}

interface State {
    isResizing: boolean;
    width: number;
    widthPercent: string;
}

export class ResizableContainer extends Component<Props, State> {
    static defaultProps = {
        minWidth: 100,
        onResizeStop: noop,
        style: null,
    };

    state: State;

    constructor(props: Props) {
        super(props);

        const minimumWidthPercent = getClampedRatioInPercent(props.minWidth, props.maxWidth);
        const maximumWidthPercent = getClampedRatioInPercent(props.width, props.maxWidth);
        const currentWidthPercent = parseInt(props.widthPercent, 10);
        const widthPercent = clamp(currentWidthPercent, minimumWidthPercent, maximumWidthPercent);

        // eslint-disable-next-line react/state-in-constructor
        this.state = {
            isResizing: false,
            width: (props.maxWidth * currentWidthPercent) / 100,
            widthPercent: `${widthPercent}%`,
        };
    }

    componentDidMount() {
        this.props.onResize(this.state.widthPercent, this.props.widthFactor);
    }

    getMaximumWidth = () => Math.min(this.props.width, this.props.maxWidth);

    getMaximumWidthInPercent = () =>
        getClampedRatioInPercent(this.props.width, this.props.maxWidth);

    handleResizeStart = () => {
        this.setState({ isResizing: true });
    };

    handleResizeStop = () => {
        this.setState({ isResizing: false });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.props.onResizeStop!();
    };

    handleResize: DraggableEventHandler = (_event, { deltaX }) => {
        this.setState(
            ({ width }, { maxWidth, minWidth }) => {
                const nextWidth = increaseWidth(width, deltaX, minWidth, this.getMaximumWidth());
                const nextWidthPercent = getClampedWidthInPercent(
                    nextWidth,
                    maxWidth,
                    this.getMaximumWidthInPercent(),
                ).toFixed(2);

                return {
                    width: nextWidth,
                    widthPercent: `${nextWidthPercent}%`,
                };
            },
            () => {
                if (this.state.widthPercent !== this.props.widthPercent) {
                    this.props.onResize(this.state.widthPercent, this.props.widthFactor);
                }
            },
        );
    };

    render() {
        const { children, className, enabled, resizingClassName, style, theme } = this.props;
        const { isResizing, widthPercent } = this.state;

        return (
            <div
                className={classNames(
                    'editor-v4-image-resizable-container',
                    className,
                    isResizing && resizingClassName,
                    {
                        'editor-v4-image-resizable-container--classic-theme':
                            theme === Theme.CLASSIC,
                        'editor-v4-image-resizable-container--dark-theme': theme === Theme.DARK,
                        'editor-v4-image-resizable-container--resizing': isResizing,
                    },
                )}
                contentEditable={false}
                style={{
                    width: widthPercent,
                    ...style,
                }}
            >
                {children}

                {enabled && (
                    <Draggable.DraggableCore
                        onDrag={this.handleResize}
                        onStart={this.handleResizeStart}
                        onStop={this.handleResizeStop}
                    >
                        <div className="editor-v4-image-resizable-container__handle">
                            <button
                                className="editor-v4-image-resizable-container__button"
                                onMouseDown={(event) => event.preventDefault()}
                                type="button"
                            >
                                <Resize className="editor-v4-image-resizable-container__button-icon" />
                            </button>
                        </div>
                    </Draggable.DraggableCore>
                )}
            </div>
        );
    }
}
