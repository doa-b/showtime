import {dummyUserObject, dummyUsers} from '../../bootstrap/users'

const initialState = {
    users: dummyUsers,
    userObject: dummyUserObject
};

const reducer = (state = initialState, action) => {
    return state
};

export default reducer;