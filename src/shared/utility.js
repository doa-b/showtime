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
export const convertObjectsAndSortByKey = (object, orderKey) => {
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
    newArray.sort((a, b) => a[orderKey] - b[orderKey]);
    console.log(newArray)
    return newArray;
};

export const calculateDuration = (parts) => {
    let duration = 0;
    parts.map((part)=> {
      duration += part.duration;
    });
    console.log(duration);

    return duration
};