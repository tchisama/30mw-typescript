import { Rows } from "@/types";
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
