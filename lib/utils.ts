import { Rows } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getValue = ({rows, index}: {rows:Rows[], index:number[]}) => {
    let value: Rows[] | Rows = rows;
    for (let i = 0; i < index.length; i++) {
        if (Array.isArray(value) && value[index[i]]) {
            value = value[index[i]].object || value[index[i]];
        } else {
            return ""; // or any other appropriate handling for invalid indices
        }
    }
    return (value as Rows).value || "";
};

