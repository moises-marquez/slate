import type { Coverage } from '@prezly/sdk';

function getCoverageTitle(coverage: Coverage): string {
    if (coverage.attachment_oembed && coverage.attachment_oembed.title) {
        return coverage.attachment_oembed.title;
    }

    if (coverage.attachment) {
        return coverage.attachment.filename;
    }

    return 'Untitled';
}

export default getCoverageTitle;
