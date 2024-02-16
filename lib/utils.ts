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
        return getValue({ rows: currentItem.object, index: index.slice(1) });
    } else if (currentItem.type === "array" && Array.isArray(currentItem.value)) {
        console.log({rows,index});  
        return getValue({ rows: currentItem.value[index[1]], index: index.slice(2) });
    } else {
        console.log({rows,index});  
        return currentItem.value || "9lwa";
    }
};
