import { isElementNode } from '@prezly/slate-types';
import type { Node } from 'slate';

import { LOADER_TYPE } from '../constants';
import type { LoaderNode } from '../types';

export function isLoaderElement(node: Node): node is LoaderNode {
    return isElementNode<LoaderNode>(node, LOADER_TYPE);
}
