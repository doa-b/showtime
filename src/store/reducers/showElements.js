import * as actionTypes from '../actions/actionTypes'
import {updateObject, convertObjectsAndSortByKey, getCurrentUTCinMs, convertObjectstoArray} from '../../shared/utility';

const initialState = {
    shows: [],
    blocks: [],
    parts: [],
    scenes: [],
    users: [
        {
            id: 'id0',
            firstName: 'Robin',
            lastName: 'Schenke',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'presenter',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id1',
            firstName: 'Jeroen',
            lastName: 'Schenke',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'presenter',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id2',
            firstName: 'Eve',
            lastName: '',
            Phone: '0612345678',
            country: 'Switserland',
            type: 'executive',
            groups: 'presenter',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id3',
            firstName: 'Bernd',
            lastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'presenter',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id4',
            firstName: 'Bianca',
            lastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'artist',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id5',
            firstName: 'Antonio',
            lastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'artist',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id6',
            firstName: 'Carmen',
            lastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'artist',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id7',
            firstName: 'Saskia',
            lastName: 'Bolk',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'artist',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id8',
            firstName: 'Arno',
            lastName: 'Doppen',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'artist',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id9',
            firstName: 'Eline',
            lastName: 'de Hond',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'artist',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id10',
            firstName: 'Tessa',
            lastName: '',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'model',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id11',
            firstName: 'Jil',
            lastName: '',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'model',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id12',
            firstName: 'Doa',
            lastName: 'Bonifacio',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'administrator',
            groups: 'dj',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id13',
            firstName: 'Bob',
            lastName: '',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'director',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id14',
            firstName: 'Mac',
            lastName: 'Guyver',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'sound',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            id: 'id15',
            firstName: 'John',
            lastName: 'Doa',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'lighting',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },],
    error: null,
    loading: false,
    currentShow: '-Lrst6TmmyYrkouGmiac',
    showName: 'Fall Trend Show',
    showStartDateTime: getCurrentUTCinMs() + 30000,
    currentTime: 0,
    displaySeconds: true,
    displayRealTime: true,
    pageTitle: 'Schedule',
    displayUser: null
};

const savedShowElement = (state, action) => {
    const newElement = updateObject(action.data, {elementId: action.elementId});
    return updateObject(state, {
        [action.elementName]: state[action.elementName].concat(newElement),
        error: null,
        loading: false
    });
};

const fetchedAllShowData = (state, action) => {
    const newState = {
        shows: convertObjectsAndSortByKey(action.shows, 'order'),
        blocks: convertObjectsAndSortByKey(action.blocks, 'order'),
        parts: convertObjectsAndSortByKey(action.parts, 'order'),
        scenes: convertObjectstoArray(action.scenes),
        error: null,
        loading: false
    };

    return updateObject(state, newState );
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_START:
            return updateObject(state, {error: null, loading: true});

        case actionTypes.SHOW_FAIL:
            return updateObject(state, {error: action.error, loading: false});

        case actionTypes.SHOW_SAVE_SUCCESS:
            return savedShowElement(state, action);

        case actionTypes.SHOW_SET_CURRENT:
            return updateObject(state, {currentShow: action.showId});

        case actionTypes.SHOW_FETCH_ALL_DATA_SUCCESS:
            return fetchedAllShowData(state, action);

        case actionTypes.SHOW_INCREMENT_CLOCK:
            return updateObject(state, {currentTime: state.currentTime + 1000});

        case actionTypes.SHOW_INITIATE_CLOCK:
            return updateObject(state, {currentTime: getCurrentUTCinMs()});

        case actionTypes.SHOW_TOGGLE_SHOW_SECONDS:
            return updateObject(state, {displaySeconds: !state.displaySeconds});

        case actionTypes.SHOW_SET_PAGE_TITLE:
            return updateObject(state, {pageTitle: action.pageTitle});

            case actionTypes.SHOW_TOGGLE_DISPLAY_REALTIME:
            return updateObject(state, {displayRealTime: !state.displayRealTime});
        case actionTypes.SHOW_SET_DISPLAY_USER:
            return updateObject(state, {displayUser: action.user});
        default:
            return state
    }
};

export default reducer;