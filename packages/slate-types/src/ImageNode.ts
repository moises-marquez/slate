import ElementNode, { isElementNode } from './ElementNode';
// import TextNode, { isTextNode } from './TextNode';
import InlineNode from './InlineNode';
import { isPrezlyStoragePayload, UploadcareImageStoragePayload } from './sdk';

export const IMAGE_NODE_TYPE = 'image';

const LAYOUTS = ['contained', 'expanded', 'full-width'];

export default interface ImageNode extends ElementNode {
    /** caption */
    children: InlineNode[];
    file: UploadcareImageStoragePayload;
    /** empty string if no URL */
    href: string;
    layout: 'contained' | 'expanded' | 'full-width';
    type: 'image-block';
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width: string;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width_factor: string;
}

export const isImageNode = (value: any): value is ImageNode =>
    isElementNode(value) &&
    value.type === IMAGE_NODE_TYPE &&
    isPrezlyStoragePayload(value.file) &&
    typeof value.href === 'string' &&
    LAYOUTS.includes(value.layout as any) &&
    typeof value.width === 'string' &&
    value.width.length > 1 &&
    typeof value.width_factor === 'string' &&
    value.width_factor.length > 1;
