import type { Option } from '../types';

/**
 * Sort the options array so the ones with `beta` come last,
 * preserving the order of all `beta` options as it was in the original list.
 */
export function sortBetaOptionsLast<Action>(options: Option<Action>[]): Option<Action>[] {
    return [...options].sort(betaLastComparator);
}

function betaLastComparator<Action>(a: Option<Action>, b: Option<Action>): -1 | 0 | 1 {
    if (a.isBeta && !b.isBeta) {
        return 1;
    }

    if (!a.isBeta && b.isBeta) {
        return -1;
    }

    return 0;
}
