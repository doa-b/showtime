import * as accessLevels from '../shared/utility'
import { convertArrayToObject } from "../shared/utility";


export const dummyUsers = [
    {
        id: 'id0',
        firstName: 'Robin',
        lastName: 'Schenke',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_EXECUTIVE,
        role: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id1',
        firstName: 'Jeroen',
        lastName: 'Schenke',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_EXECUTIVE,
        role: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id2',
        firstName: 'Eve',
        lastName: '',
        Phone: '0612345678',
        country: 'Switserland',
        type: accessLevels.ACCESS_LEVEL_EXECUTIVE,
        role: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id3',
        firstName: 'Bernd',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id4',
        firstName: 'Bianca',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id5',
        firstName: 'Antonio',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id6',
        firstName: 'Carmen',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id7',
        firstName: 'Saskia',
        lastName: 'Bolk',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id8',
        firstName: 'Arno',
        lastName: 'Doppen',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id9',
        firstName: 'Eline',
        lastName: 'de Hond',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'artist',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id19',
        firstName: 'Matej',
        lastName: '',
        Phone: '0612345678',
        country: 'Germany',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'presenter',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id10',
        firstName: 'Tessa',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id11',
        firstName: 'Jil',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id12',
        firstName: 'Doa',
        lastName: 'Bonifacio',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_ADMINISTRATOR,
        role: 'dj',
        imageUrl: 'http://djdoa.nl/DJDoa_WebPages/__Old_Website/doa_avatar_small.jpg'
    },
    {
        id: 'id13',
        firstName: 'Bob',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_ADMINISTRATOR,
        role: 'director',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id14',
        firstName: 'Mac',
        lastName: 'Guyver',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_SUPPORT,
        role: 'sound',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id15',
        firstName: 'John',
        lastName: 'Doe',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_SUPPORT,
        role: 'light',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id20',
        firstName: 'Johhny',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_TRINITY,
        role: 'photographer',
        imageUrl: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg'
    },
    {
        id: 'id16',
        firstName: 'Dancer 1',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'dancer',
        imageUrl: 'https://image.tmdb.org/t/p/original/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg'
    },
    {
        id: 'id17',
        firstName: 'Dancer 2',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'dancer',
        imageUrl: 'https://image.tmdb.org/t/p/original/5MgWM8pkUiYkj9MEaEpO0Ir1FD9.jpg'
    },
    {
        id: 'id18',
        firstName: 'Dancer 3',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'dancer',
        imageUrl: ''
    },
    {
        id: 'id21',
        firstName: 'Trend Model 1',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id22',
        firstName: 'Trend Model 2',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id23',
        firstName: 'Trend Model 3',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id24',
        firstName: 'Trend Model 4',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id25',
        firstName: 'Trend Model 5',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id26',
        firstName: 'Trend Model 6',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/opEemSnjnN4hbwymHz5P0VVuk4F.jpg'
    },
    {
        id: 'id27',
        firstName: 'Tailors Model 1',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id28',
        firstName: 'Tailors Model 2',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id29',
        firstName: 'Tailors Model 3',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id30',
        firstName: 'Tailors Model 4',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id31',
        firstName: 'Tailors Model 5',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id32',
        firstName: 'Tailors Model 6',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id33',
        firstName: 'Tailors Model 7',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id34',
        firstName: 'Tailors Model 8',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    },
    {
        id: 'id35',
        firstName: 'Dreamotionz Models',
        lastName: '',
        Phone: '0612345678',
        country: 'Netherlands',
        type: accessLevels.ACCESS_LEVEL_MEMBER,
        role: 'model',
        imageUrl: 'https://image.tmdb.org/t/p/original/PSK6GmsVwdhqz9cd1lwzC6a7EA.jpg'
    }
];

export const dummyUserObject = convertArrayToObject(dummyUsers, 'id');