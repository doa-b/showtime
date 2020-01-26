import React from 'react'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjectsOutlined';
import VolumeUpIcon from '@material-ui/icons/VolumeUpOutlined';
import VideocamIcon from '@material-ui/icons/VideocamOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeopleOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCameraOutlined';

// function that creates a uuid
export function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


// function that sets an object immutably
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

/**
 *
 * @param object the object of objects that needs to be converted to array of objects
 * @param orderKey the orderKey by which the new array needs to be sorted
 */

function checkNested(obj, level, ...rest) {
    if (obj === undefined) return false
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
    return checkNested(obj[level], ...rest)
}

export const compareValues = (key, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
};

export const convertObjectsAndSortByKey = (object, orderKey, order = 'asc') => {
    // convert object of objects into array of objects, when you do not need the orderKey
    // let newArray = Object.values(object);

    // convert object of objects into array of objects, when you DO not need the orderKey
    let newArray = [];
    for (let key in object) {
        newArray.push(
            {
                ...object[key],
                id: key
            });
    }

    // sort array of objects by order orderKey
    newArray.sort(compareValues(orderKey));
    return newArray;
};

export const convertObjectstoArray = (object) => {
    // convert object of objects into array of objects, when you do not need the Key
    // let newArray = Object.values(object);

    // convert object of objects into array of objects, when you DO not need the Key
    let newArray = [];
    for (let key in object) {
        // check if object has a nested object

        newArray.push(
            {
                ...object[key],
                id: key
            });
    }
    return newArray;
};

export const convertArrayToObject = (elementsArray, idField) => {
    let newObject = {};
    elementsArray.map((element) => {
        const newElement = {...element};
        delete newElement[idField]; // delete idField in object
        return newObject[element[idField]] = newElement;
    });
    return newObject;
};

export const calculateDuration = (parts) => {
    let duration = 0;
    parts.map((part) => {
        duration += part.duration
    });
    console.log(duration);

    return duration
};

export const msToDate = (miliseconds) => {
    const date = new Date(miliseconds);
    return date.toDateString();
};

export const durationToDateTime = (duration) => {
    const date = new Date(duration);
    console.log(date)
    return date;
};
export const dateToMs = (date) => {
    return date.getUTCMilliseconds()
};

export const msToTime = (miliseconds, withSeconds, withHours = true) => {
    // add leading zero for number <10
    const alz = (value) => {
        return (value < 10) ? '0' + value : value;
    };

    var milliseconds = parseInt((miliseconds % 1000) / 100),
        seconds = Math.floor((miliseconds / 1000) % 60),
        minutes = Math.floor((miliseconds / (1000 * 60)) % 60),
        hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
    const showHours = (withHours) ? alz(hours) + ':' : '';


    if (withSeconds) {
        return showHours + alz(minutes) + ":" + alz(seconds)
    } else return showHours + alz(minutes);
};

export const getCurrentUTCinMs = () => {
    var currentDate = new Date();
    return currentDate.getTime() - currentDate.getTimezoneOffset() * 60000;
};

// Access Levels
export const ACCESS_LEVEL_UNREGISTERED = 0;
export const ACCESS_LEVEL_GUEST = 10;
export const ACCESS_LEVEL_MEMBER = 20;
export const ACCESS_LEVEL_SUPPORT = 30;
export const ACCESS_LEVEL_TRINITY = 40;
export const ACCESS_LEVEL_EXECUTIVE = 50;
export const ACCESS_LEVEL_ADMINISTRATOR = 60;

// Scene Catagories. Value is index
export const sceneCategories = [
    {
        label: 'Task',
        icon: <AssignmentIcon/>
    },
    {
        label: 'Grip',
        icon: <EmojiPeopleIcon/>
    },
    {
        label: 'Lighting',
        icon: <EmojiObjectsIcon/>
    },
    {
        label: 'Sound',
        icon: <VolumeUpIcon/>
    },
    {
        label: 'Video',
        icon: <VideocamIcon/>
    },
    {
        label: 'Still',
        icon: <ImageIcon/>
    }
];

export const humanFileSize = (bytes, si = 1024) => {
    let thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    let units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
};


export const top100Films = [
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Shawshank Redemption',
        year: 1994
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Godfather',
        year: 1972
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Godfather: Part II',
        year: 1974
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Dark Knight',
        year: 2008
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: '12 Angry Men',
        year: 1957
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: "Schindler's List",
        year: 1993
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'Pulp Fiction',
        year: 1994
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Good, the Bad and the Ugly',
        year: 1966
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'Fight Club',
        year: 1999
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'Forrest Gump',
        year: 1994
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'Inception',
        year: 2010
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: "One Flew Over the Cuckoo's Nest",
        year: 1975
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'Goodfellas',
        year: 1990
    },
    {
        id: 'ewrqwersdfewrq',
        avatar: 'https://image.tmdb.org/t/p/original/zixTWuMZ1D8EopgOhLVZ6Js2ux3.jpg',
        title: 'The Matrix',
        year: 1999
    },
    {title: 'Seven Samurai', year: 1954},
    {title: 'Star Wars: Episode IV - A New Hope', year: 1977},
    {title: 'City of God', year: 2002},
    {title: 'Se7en', year: 1995},
    {title: 'The Silence of the Lambs', year: 1991},
    {title: "It's a Wonderful Life", year: 1946},
    {title: 'Life Is Beautiful', year: 1997},
    {title: 'The Usual Suspects', year: 1995},
    {title: 'Léon: The Professional', year: 1994},
    {title: 'Spirited Away', year: 2001},
    {title: 'Saving Private Ryan', year: 1998},
    {title: 'Once Upon a Time in the West', year: 1968},
    {title: 'American History X', year: 1998},
    {title: 'Interstellar', year: 2014},
    {title: 'Casablanca', year: 1942},
    {title: 'City Lights', year: 1931},
    {title: 'Psycho', year: 1960},
    {title: 'The Green Mile', year: 1999},
    {title: 'The Intouchables', year: 2011},
    {title: 'Modern Times', year: 1936},
    {title: 'Raiders of the Lost Ark', year: 1981},
    {title: 'Rear Window', year: 1954},
    {title: 'The Pianist', year: 2002},
    {title: 'The Departed', year: 2006},
    {title: 'Terminator 2: Judgment Day', year: 1991},
    {title: 'Back to the Future', year: 1985},
    {title: 'Whiplash', year: 2014},
    {title: 'Gladiator', year: 2000},
    {title: 'Memento', year: 2000},
    {title: 'The Prestige', year: 2006},
    {title: 'The Lion King', year: 1994},
    {title: 'Apocalypse Now', year: 1979},
    {title: 'Alien', year: 1979},
    {title: 'Sunset Boulevard', year: 1950},
    {title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964},
    {title: 'The Great Dictator', year: 1940},
    {title: 'Cinema Paradiso', year: 1988},
    {title: 'The Lives of Others', year: 2006},
    {title: 'Grave of the Fireflies', year: 1988},
    {title: 'Paths of Glory', year: 1957},
    {title: 'Django Unchained', year: 2012},
    {title: 'The Shining', year: 1980},
    {title: 'WALL·E', year: 2008},
    {title: 'American Beauty', year: 1999},
    {title: 'The Dark Knight Rises', year: 2012},
    {title: 'Princess Mononoke', year: 1997},
    {title: 'Aliens', year: 1986},
    {title: 'Oldboy', year: 2003},
    {title: 'Once Upon a Time in America', year: 1984},
    {title: 'Witness for the Prosecution', year: 1957},
    {title: 'Das Boot', year: 1981},
    {title: 'Citizen Kane', year: 1941},
    {title: 'North by Northwest', year: 1959},
    {title: 'Vertigo', year: 1958},
    {title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983},
    {title: 'Reservoir Dogs', year: 1992},
    {title: 'Braveheart', year: 1995},
    {title: 'M', year: 1931},
    {title: 'Requiem for a Dream', year: 2000},
    {title: 'Amélie', year: 2001},
    {title: 'A Clockwork Orange', year: 1971},
    {title: 'Like Stars on Earth', year: 2007},
    {title: 'Taxi Driver', year: 1976},
    {title: 'Lawrence of Arabia', year: 1962},
    {title: 'Double Indemnity', year: 1944},
    {title: 'Eternal Sunshine of the Spotless Mind', year: 2004},
    {title: 'Amadeus', year: 1984},
    {title: 'To Kill a Mockingbird', year: 1962},
    {title: 'Toy Story 3', year: 2010},
    {title: 'Logan', year: 2017},
    {title: 'Full Metal Jacket', year: 1987},
    {title: 'Dangal', year: 2016},
    {title: 'The Sting', year: 1973},
    {title: '2001: A Space Odyssey', year: 1968},
    {title: "Singin' in the Rain", year: 1952},
    {title: 'Toy Story', year: 1995},
    {title: 'Bicycle Thieves', year: 1948},
    {title: 'The Kid', year: 1921},
    {title: 'Inglourious Basterds', year: 2009},
    {title: 'Snatch', year: 2000},
    {title: '3 Idiots', year: 2009},
    {title: 'Monty Python and the Holy Grail', year: 1975},
];

