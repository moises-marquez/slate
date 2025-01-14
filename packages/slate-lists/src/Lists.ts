import {
    canDeleteBackward,
    decreaseDepth,
    decreaseListItemDepth,
    getListItemsInRange,
    getListsInRange,
    getListType,
    getNestedList,
    getParentList,
    getParentListItem,
    increaseDepth,
    increaseListItemDepth,
    isCursorAtStartOfListItem,
    isCursorInEmptyListItem,
    isList,
    isListItem,
    isListItemText,
    listItemContainsText,
    moveListItemsToAnotherList,
    moveListToListItem,
    setListType,
    splitListItem,
    unwrapList,
    wrapInList,
} from './lib';
import type { ListsOptions } from './types';

/**
 * Creates an API adapter with functions bound to passed options.
 */
export function Lists(options: ListsOptions) {
    return {
        canDeleteBackward: canDeleteBackward.bind(null, options),
        decreaseDepth: decreaseDepth.bind(null, options),
        decreaseListItemDepth: decreaseListItemDepth.bind(null, options),
        getListItemsInRange: getListItemsInRange.bind(null, options),
        getListsInRange: getListsInRange.bind(null, options),
        getListType: getListType.bind(null, options),
        getNestedList: getNestedList.bind(null, options),
        getParentList: getParentList.bind(null, options),
        getParentListItem: getParentListItem.bind(null, options),
        increaseDepth: increaseDepth.bind(null, options),
        increaseListItemDepth: increaseListItemDepth.bind(null, options),
        isCursorAtStartOfListItem: isCursorAtStartOfListItem.bind(null, options),
        isCursorInEmptyListItem: isCursorInEmptyListItem.bind(null, options),
        isList: isList.bind(null, options),
        isListItem: isListItem.bind(null, options),
        isListItemText: isListItemText.bind(null, options),
        listItemContainsText: listItemContainsText.bind(null, options),
        moveListItemsToAnotherList: moveListItemsToAnotherList.bind(null, options),
        moveListToListItem: moveListToListItem.bind(null, options),
        setListType: setListType.bind(null, options),
        splitListItem: splitListItem.bind(null, options),
        unwrapList: unwrapList.bind(null, options),
        wrapInList: wrapInList.bind(null, options),
    };
}
