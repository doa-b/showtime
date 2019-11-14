import * as actionTypes from '../actions/actionTypes'
import {updateObject, convertObjectsAndSortByKey, getCurrentUTCinMs} from '../../shared/utility';

const initialState = {
    shows: [],
    blocks: [],
    parts: [],
    scenes: [],
    users: [
        {
            firstName: 'Robin',
            LastName: 'Schenke',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Presentor',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Jeroen',
            LastName: 'Schenke',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Presentor',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Eve',
            LastName: '',
            Phone: '0612345678',
            country: 'Switserland',
            type: 'executive',
            groups: 'Presentor',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Bernd',
            LastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'Presentor',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Bianca',
            LastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'Hairdresser',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Antonio',
            LastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'Hairdresser',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Carmen',
            LastName: '',
            Phone: '0612345678',
            country: 'Germany',
            type: 'executive',
            groups: 'Hairdresser',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Saskia',
            LastName: 'Bolk',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Hairdresser',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Arno',
            LastName: 'Doppen',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Hairdresser',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Eline',
            LastName: 'de Hond',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Hairdresser',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Tessa',
            LastName: '',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Model',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Jil',
            LastName: '',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Model',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Doa',
            LastName: 'Bonifacio',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'administrator',
            groups: 'dj',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Bob',
            LastName: '',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Technical Lead',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'Mac',
            LastName: 'Guyver',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Engineer',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },
        {
            firstName: 'John',
            LastName: 'Doa',
            Phone: '0612345678',
            country: 'Netherlands',
            type: 'executive',
            groups: 'Engineer',
            imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
        },],
    error: null,
    loading: false,
    currentShow: '-Lrst6TmmyYrkouGmiac',
    showName: 'Fall Trend Show',
    showStartDateTime: getCurrentUTCinMs() + 30000,
    currentTime: 0,
    showSeconds: true,
    showRealTime: true,
    pageTitle: 'Schedule'
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
        blocks: convertObjectsAndSortByKey(action.blocks, 'order'),
        parts: convertObjectsAndSortByKey(action.parts, 'order'),
        scenes: convertObjectsAndSortByKey(action.scenes, 'order'),
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
            return updateObject(state, {showSeconds: !state.showSeconds});

        case actionTypes.SHOW_SET_PAGE_TITLE:
            return updateObject(state, {pageTitle: action.pageTitle});

        default:
            return state
    }
};

export default reducer;