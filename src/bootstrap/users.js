import * as accessLevels from '../shared/utility'
import {ACCESS_LEVEL_ADMINISTRATOR} from "../shared/utility";

export const dummyUsers = [
    {
        id: 'id0',
        firstName: 'Robin',
        lastName: 'Schenke',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_EXECUTIVE,
        groups: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id1',
        firstName: 'Jeroen',
        lastName: 'Schenke',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_EXECUTIVE,
        groups: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id2',
        firstName: 'Eve',
        lastName: '',
        Phone: '0612345678',
        country: 'Switserland',
        type: accessLevels.ACCESS_LEVEL_EXECUTIVE,
        groups: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id3',
        firstName: 'Bernd',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id4',
        firstName: 'Bianca',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id5',
        firstName: 'Antonio',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id6',
        firstName: 'Carmen',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id7',
        firstName: 'Saskia',
        lastName: 'Bolk',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id8',
        firstName: 'Arno',
        lastName: 'Doppen',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id9',
        firstName: 'Eline',
        lastName: 'de Hond',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id19',
        firstName: 'Matej',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id10',
        firstName: 'Tessa',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        groups: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id11',
        firstName: 'Jil',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        groups: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id12',
        firstName: 'Doa',
        lastName: 'Bonifacio',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_ADMINISTRATOR,
        groups: 'dj',
        imageUrl: 'http://djdoa.nl/DJDoa_WebPages/__Old_Website/doa_avatar_small.jpg'
    },
    {
        id: 'id13',
        firstName: 'Bob',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_ADMINISTRATOR,
        groups: 'director',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id14',
        firstName: 'Mac',
        lastName: 'Guyver',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_SUPPORT,
        groups: 'sound',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id15',
        firstName: 'John',
        lastName: 'Doe',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_SUPPORT,
        groups: 'light',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id20',
        firstName: 'Johhny',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        groups: 'photographer',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id16',
        firstName: 'Dancer 1',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        groups: 'dancer',
        imageUrl: 'https://image.tmdb.org/t/p/original/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg'
    },
    {
        id: 'id17',
        firstName: 'Dancer 2',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        groups: 'dancer',
        imageUrl: 'https://image.tmdb.org/t/p/original/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg'
    },
    {
        id: 'id18',
        firstName: 'Dancer 3',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        groups: 'dancer',
        imageUrl: ''
    }
];