import {createUUID} from "./utility";

/*

 */
export const createLog = (
    userId = '',
    userName = '',
    showId = '',
    showTitle = '',
    action = '',
    data = {},
    targetId = '',
    targetTitle = ''
) => {
    const uid = createUUID();
    const date = new Date().getTime();
    return {uid, date, userId, userName, showId, showTitle, action, targetId, targetTitle};
};