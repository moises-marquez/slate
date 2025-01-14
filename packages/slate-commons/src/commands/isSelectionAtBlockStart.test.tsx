/** @jsx jsx */

import { jsx } from '../jsx';
import { createEditor } from '../test-utils';

import { isSelectionAtBlockStart } from './isSelectionAtBlockStart';

describe('isSelectionAtBlockStart', () => {
    it('Returns true when the cursor is at the start of the block', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                        lorem ipsum
                    </h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockStart(editor)).toBe(true);
    });

    it('Returns true when the selection starts at the start of the block', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <focus />
                        lorem ipsum
                        <anchor />
                    </h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockStart(editor)).toBe(true);
    });

    it('Returns true when the selection is at the start of text inside an inline element', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-inline-element href="https://example.com">
                        <h-text>
                            <cursor />
                            lorem ipsum
                        </h-text>
                    </h-inline-element>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockStart(editor)).toBe(true);
    });

    it('Returns false when the cursor is in the middle of text', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem
                        <cursor />
                    </h-text>
                    <h-text> ipsum</h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockStart(editor)).toBe(false);
    });

    it('Returns false when there is another inline element after the cursor', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-inline-element href="https://example.com">
                        <h-text>
                            lorem
                            <cursor />
                        </h-text>
                    </h-inline-element>
                    <h-inline-element href="https://example.com">
                        <h-text>ipsum</h-text>
                    </h-inline-element>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockStart(editor)).toBe(false);
    });

    it('Returns false when there is no selection', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>,
        );

        expect(isSelectionAtBlockStart(editor)).toBe(false);
    });
});
