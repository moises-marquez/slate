import { GalleryNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import useMeasure from 'react-use/lib/useMeasure';

import { Lightbox } from '../../components';

import { DEFAULT_MAX_VIEWPORT_WIDTH, IMAGE_PADDING, IMAGE_SIZE } from './constants';
import './Gallery.scss';
import GalleryImage from './GalleryImage';
import { calculateLayout, prepareImages, useGallery } from './lib';

interface Props extends HTMLAttributes<HTMLElement> {
    node: GalleryNode;
    maxViewportWidth?: number;
}

const Gallery: FunctionComponent<Props> = ({
    children,
    className,
    maxViewportWidth = DEFAULT_MAX_VIEWPORT_WIDTH,
    node,
    ...props
}) => {
    const [ref, { width }] = useMeasure<HTMLDivElement>();
    const margin = IMAGE_PADDING[node.padding];
    const idealHeight = IMAGE_SIZE[node.thumbnail_size] + 2 * margin;
    const imagesStyle = { margin: -margin };
    const images = useMemo(() => prepareImages(node, maxViewportWidth), [node]);
    const calculatedLayout = calculateLayout({ idealHeight, images, viewportWidth: width });
    const [
        { image, isNextEnabled, isPreviousEnabled },
        { onClose, onNext, onOpen, onPrevious },
    ] = useGallery(images);

    // TODO: multiline ellipsis (3 lines)

    return (
        <figure
            className={classNames('prezly-slate-gallery', className, {
                'prezly-slate-gallery--contained': node.layout === 'contained',
                'prezly-slate-gallery--expanded': node.layout === 'expanded',
                'prezly-slate-gallery--full-width': node.layout === 'full-width',
            })}
            {...props}
        >
            <div ref={ref} style={imagesStyle}>
                {calculatedLayout.map((row, index) => (
                    <div className="prezly-slate-gallery__row" key={index}>
                        {row.map(({ width, height, image }) => (
                            <GalleryImage
                                height={height}
                                image={image}
                                key={image.uuid}
                                margin={margin}
                                onClick={onOpen}
                                width={width}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <Lightbox
                image={image}
                isNextEnabled={isNextEnabled}
                isPreviousEnabled={isPreviousEnabled}
                onClose={onClose}
                onNext={onNext}
                onPrevious={onPrevious}
            >
                {children}
            </Lightbox>
        </figure>
    );
};

export default Gallery;
