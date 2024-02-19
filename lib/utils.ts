import { Rows, collType } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getValue = ({ rows, index }: { rows: Rows[]; index: number[] }): any => {
    const currentItem = rows[index[0]];
    if (!currentItem || index.length === 0) {
        return undefined;
    }

    if (currentItem.type === "object" && currentItem.object) {
        // Create a new object for each array item containing an object
        const newObject = currentItem.object
        return getValue({ rows: newObject, index: index.slice(1) });
    } else if (currentItem.type === "array" && Array.isArray(currentItem.value)) {
        return getValue({ rows: currentItem.value[index[1]], index: index.slice(2) });
    } else {
        return currentItem.value || "";
    }
};
export const getRow = ({ rows, index }: { rows: Rows[]; index: number[] }): any => {
  
};



export const setValue = ({ rows, index, newValue }: { rows: any[]; index: number[]; newValue: any }): any[] => {
    const newRows = [...rows]; // Create a shallow copy of the original rows array

    let currentItem = newRows[index[0]];

    if (!currentItem || index.length === 0) {
        return newRows; // Return the original rows array if index is out of bounds or invalid input
    }

    if (index.length === 1) {
        // If the index points to the desired value directly
        currentItem.value = newValue;
        return newRows;
    }

    if (currentItem.type === "object" && currentItem.object && currentItem.object.length > 0) {
        // If the current item is an object, go one level deeper
        const updatedObject = setValue({ rows: currentItem.object, index: index.slice(1), newValue });
        currentItem.object = updatedObject;
    } else if (currentItem.type === "array" && Array.isArray(currentItem.value)) {
        // If the current item is an array, go one level deeper
        currentItem.value[index[1]] = setValue({ rows: currentItem.value[index[1]], index: index.slice(2), newValue });
    } else {
        // This case is when we have reached the target value
        currentItem.value = newValue;
    }

    return newRows;
};




export const setType = ({ rows, index, newValue }: { rows: any[]; index: number[]; newValue: any }): any[] => {

    const newRows = [...rows]; // Create a shallow copy of the original rows array

    let currentItem = newRows[index[0]];

    if (!currentItem || index.length === 0) {
        return newRows; // Return the original rows array if index is out of bounds or invalid input
    }

    if (index.length === 1) {
        // If the index points to the desired value directly
        currentItem.type = newValue;
        return newRows;
    }

    if (currentItem.type === "object" && currentItem.object &&  currentItem.object.length > 0) {
        // If the current item is an object, go one level deeper
        const updatedObject = setType({ rows: currentItem.object, index: index.slice(1), newValue });
        currentItem.object = updatedObject;
    } else if (currentItem.type === "array" && currentItem.array && currentItem.array.length > 0) {
        // If the current item is an array, go one level deeper
        const updatedObject = setType({ rows: currentItem.array, index: index.slice(1), newValue });
        currentItem.array = updatedObject;
    } else {
        // This case is when we have reached the target value
        currentItem = newValue;
    }

    return newRows;
};


export const setName = ({ rows, index, newValue }: { rows: any[]; index: number[]; newValue: any }): any[] => {
    const newRows = [...rows]; // Create a shallow copy of the original rows array

    let currentItem = newRows[index[0]];

    if (!currentItem || index.length === 0) {
        return newRows; // Return the original rows array if index is out of bounds or invalid input
    }

    if (index.length === 1) {
        // If the index points to the desired value directly
        currentItem.name = newValue;
        return newRows;
    }

    if (currentItem.type === "object" && currentItem.object && currentItem.object.length > 0) {
        // If the current item is an object, go one level deeper
        const updatedObject = setName({ rows: currentItem.object, index: index.slice(1), newValue });
        currentItem.object = updatedObject;
    } else if (currentItem.type === "array") {
        // If the current item is an array, go one level deeper
        const updatedObject = setName({ rows: currentItem.array, index: index.slice(1), newValue });
        currentItem.array = updatedObject;
    } else {
        // This case is when we have reached the target value
        currentItem.name = newValue;
    }

    return newRows;

}

// setSelect ({ rows, index, newRow })
export const setSelect = ({ rows, index, newValue }: { rows: any[]; index: number[]; newValue: any }): any[] => {

    const newRows = [...rows]; // Create a shallow copy of the original rows array

    let currentItem = newRows[index[0]]

    if (!currentItem || index.length === 0) {
        return newRows; // Return the original rows array if index is out of bounds or invalid input
    }

    if (index.length === 1) {
        // If the index points to the desired value directly
        currentItem.select = newValue;
        return newRows;
    }

    if (currentItem.type === "object" && currentItem.object && currentItem.object.length > 0) {
        // If the current item is an object, go one level deeper
        const updatedObject = setSelect({ rows: currentItem.object, index: index.slice(1), newValue });
        currentItem.object = updatedObject;
    } else if (currentItem.type === "array") {
        // If the current item is an array, go one level deeper
        const updatedObject = setSelect({ rows: currentItem.array, index: index.slice(1), newValue });
        currentItem.array = updatedObject;
    } else {
        // This case is when we have reached the target value
        currentItem.select = newValue;
    }

    return newRows;
}



export const addRow = ({ rows, index, newValue }: { rows: any[]; index: number[]; newValue: any }): any[] => {
    // Make a shallow copy of the rows array
    const newRows = [...rows];

    if (index.length === 0) {
        const res = [...newRows];
        // i want to filter with the name
        return [...res.filter((item) => item.name !== newValue.name), newValue];
        // return [...newRows, {name:"hell",type:"string"}];
    }

    if (newRows[index[0]].type === "object") {
        if (!newRows[index[0]].object) {
            newRows[index[0]].object = [];
        }
        newRows[index[0]].object =  addRow({ rows: newRows[index[0]].object, index: index.slice(1), newValue })

    } else if (newRows[index[0]].type === "array") {
        if (!newRows[index[0]].array) {
            newRows[index[0]].array = [];
        }
        newRows[index[0]].array = addRow({ rows: newRows[index[0]].array, index: index.slice(1), newValue });

    } else {
        newRows[index[0]] = newValue;
    }

    // return [...newRows, newValue];
    return newRows;
};



export const removeRow = ({ rows, index }: { rows: any[]; index: number[] }) => {
    if(index.length === 0) {
        return rows
    }
    if(rows[index[0]].type === "object" && index.length > 1) {
        rows[index[0]].object = removeRow({rows: rows[index[0]].object, index: index.slice(1)})
    } else if(rows[index[0]].type === "array" && index.length > 1) {
        rows[index[0]].array = removeRow({rows: rows[index[0]].array, index: index.slice(1)})
    } else {
        rows.splice(index[0], 1)
    }
    return rows
}