"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { cn, getValue } from "@/lib/utils";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Rows } from "@/types";
import { format } from "date-fns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";
import { CalendarIcon, Loader2, Replace, Upload } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Timestamp, collection, getDocs, query, where } from "firebase/firestore";
import UploadImage from "./UploadImage";
import { db } from "@/firebase";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ViewRow from "./ViewRow";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { resourceUsage } from "process";

const InputsRow = ({
  maxLength = 400,
  row: {
    name,
    value,
    type,
    prefix,
    select,
    reference,
    key,
    array,
    object,
  },
  setRows,
  index,
  rows,
}: {
  maxLength?: number;
  index: number[];
  row: Rows;
  setRows: Dispatch<SetStateAction<Rows[]>>;
  rows: Rows[];
}) => {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    console.log(rows);
    if (type === "reference") {
      if (!reference) return;
      getDocs(query(collection(db, reference), where("deleted", "==", false))).then((doc) => {
        setDocs(doc.docs.map((d) => ({ ...d.data(), id: d.id })));
      });
    }
  }, [type, reference, rows,index]);

const onValueChange = (newValue: any) => {
    setRows((prevRows) => {
				if(index.length==1) return (
							rows.map((r,i)=>
								i == index[0] ? { ...r, value: newValue } : r
							)
				)
        const newRows = [...prevRows];
        let currentObject = newRows[index[0]];
        for (let i = 1; i < index.length - 1; i++) {
					if(currentObject.type=="object"){
            if (currentObject && currentObject.object) {
                currentObject = currentObject.object[index[i]];
            } else {
                // Handle the case where currentObject or currentObject.object is undefined
                // For example, you might return prevRows as is, throw an error, or handle it in another way.
                return prevRows;
            }
					}else if(currentObject.type=="array"){
            if (currentObject && currentObject.value) {
                currentObject = currentObject.value[index[i]];
            } else {
                // Handle the case where currentObject or currentObject.object is undefined
                // For example, you might return prevRows as is, throw an error, or handle it in another way.
                return prevRows;
            }
					}
				}

        if (currentObject && currentObject.object) {
            currentObject.object[index[index.length - 1]].value = newValue;
        } else {
            // Handle the case where currentObject or currentObject.object is undefined
            // For example, you might return prevRows as is, throw an error, or handle it in another way.
            return prevRows;
        }

        return newRows;
    });
};

// const _rows = [
//     {
//         "name": "customer",
//         "type": "string",
//         "value": "tchisama"
//     },
//     {
//         "name": "object",
//         "type": "object",
//         "object": [
//             {
//                 "name": "product",
//                 "type": "string"
//             },
//             {
//                 "name": "inStock",
//                 "type": "boolean"
//             },
//             {
//                 "name": "object number 2",
//                 "type": "object",
//                 "object": [
//                     {
//                         "name": "product",
//                         "type": "string"
//                     },
//                     {
//                         "name": "inStock",
//                         "type": "boolean"
//                     }
//                 ]
//             }
//         ]
//     },
    
// ]	


  // Convert index array to string key
  const indexKey = index.join("-");

  return (
    <div
      className={cn(
        "flex justify-between pt-1 ",
        type === "image" || type === "text" || type === "array" || type === "object" ? "flex-col" : " gap-4  items-center"
      )}
    >
      <div className="capitalize text-gray-700 font-medium">{name}</div>
      {type === "string" ? (
        <div className="flex flex-row-reverse gap-2 items-center">
          <Input
            type="text"
            placeholder={"Enter value"}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              onValueChange(e.currentTarget.value);
            }}
            className="w-[300px]"
            value={String(getValue({rows,index}))}
          />
          {prefix && <div>{prefix}</div>}
        </div>
      ) : type === "number" ? (
        <div className="flex flex-row-reverse gap-2 items-center">
          <Input
            placeholder={"Enter value"}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              onValueChange(e.currentTarget.value);
            }}
            className="w-[300px]"
            type="number"
            value={Number(getValue({rows,index}))}
          />
          {prefix && <div>{prefix}</div>}
        </div>
      ) : type === "time" ? (
        <div className="flex flex-row-reverse gap-2 items-center">
          <Input
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              onValueChange(e.currentTarget.value);
            }}
            className="w-[300px]"
            placeholder={"Enter value"}
            type="time"
            value={String(getValue({rows,index}))}
          />
          {prefix && <div>{prefix}</div>}
        </div>
      ) : type === "boolean" ? (
        <Switch
          onCheckedChange={(isChecked: boolean) => onValueChange(isChecked)}
          checked={Boolean(getValue({rows,index}))}
        />
      ) : type === "image" ? (
        <div className="relative">
          <UploadImage returnImage={(image: string) => onValueChange(image)} className="absolute top-4 right-2">
            {({ id, loading }) => {
              return (
                <Button
                  onClick={() => {
                    // click the input file with the id
                    document.getElementById(id)?.click();
                  }}
                  className="gap-2"
                  variant={"outline"}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Loading
                    </>
                  ) : !getValue({rows,index}) ? (
                    <>
                      <Upload size={18} /> Upload
                    </>
                  ) : (
                    <>
                      <Replace size={18} /> Change
                    </>
                  )}
                </Button>
              );
            }}
          </UploadImage>
          {getValue({rows,index}) ? (
            <Image
              src={String(getValue({rows,index}))}
              width={300}
              height={300}
              className="w-full max-h-[400px] object-contain mt-2  border rounded-xl bg-slate-50"
              alt=""
            />
          ) : (
            <div className="w-full max-h-[400px] flex items-center justify-center text-lg object-contain mt-2 h-[300px] border rounded-xl bg-slate-50">
              Upload Image
            </div>
          )}
        </div>
      ) : type === "text" ? (
        <Textarea
          placeholder={"Enter value"}
          onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            onValueChange(e.currentTarget.value);
          }}
          className="min-h-[150px] my-2 w-full"
          value={String(getValue({rows,index}))}
        />
      ) : type === "select" ? (
        <Select defaultValue={value} onValueChange={(value: string) => onValueChange(value)}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder={name} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select {name}</SelectLabel>
              {select &&
                select.map((s) => {
                  return <SelectItem key={s.name} value={s.value}>{s.name}</SelectItem>;
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : type === "reference" ? (
        <Select defaultValue={value} onValueChange={(value: string) => setRows(rows.map((r, i) => (i === index[index.length - 1] ? { ...r, value } : r)))}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder={name} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select {name}</SelectLabel>
              {docs &&
                docs.map((s) => {
                  return <SelectItem key={s.id} value={s.id}>{s[key]}</SelectItem>;
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : type === "date" ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !getValue({rows,index}) && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {isDate(getValue({rows,index})) ? (
                format(new Date(getValue({rows,index})), "PPP")
              ) : getValue({rows,index}) ? (
                format(new Date((getValue({rows,index}) as Timestamp).toDate()), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={getValue({rows,index})} onSelect={(value) => onValueChange(value)} initialFocus />
          </PopoverContent>
        </Popover>
      ) : type === "array" ? (
        <div className="flex flex-col ">
          <Button className="ml-auto">Add to {name}</Button>
          <Carousel className="p-2 min-h-16 bg-slate-50 mt-2 border rounded-md flex flex-col gap-2">
            <CarouselContent>
              {
									value?.length > 0 ?
									value?.map((a:Rows[], i:number) => (
											<CarouselItem key={i} className='flex flex-col gap-1'>
													{
															a.map((b:Rows, j:number) => (
																	<div key={i} className='p-1 px-2 bg-white border  rounded-md'>
																			<InputsRow index={[...index, i]} rows={rows} setRows={setRows} row={b} />
																	</div>
															))
													}
											</CarouselItem>
									))
               : (
                <div className="flex items-center justify-center w-full h-16">
                  <div className="p-1 px-2 bg-white border  rounded-md">No data</div>
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-1" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-1" />
          </Carousel>
        </div>
      ) : type === "object" ? (
        <div className="p-2 px-3 bg-slate-400/5 mt-2 border rounded-md flex flex-col ">
          {Array.isArray(object) &&
            object?.map((a: Rows, i: number) => (
              <>
                <InputsRow
                  index={[...index, i]} // Append current index to the array
                  rows={rows}
                  setRows={setRows}
                  key={i}
                  row={a}
                />
                {i < object.length - 1 && <Separator className="my-1 mt-2" />}
              </>
            ))}
        </div>
      ) : null}
    </div>
  );
};

function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export default InputsRow;
