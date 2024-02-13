import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Rows, RowsTypes } from "@/types";
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, Circle, Loader, Replace, Upload } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Timestamp } from "firebase/firestore";
import UploadImage from "./UploadImage";


const InputsRow = ({
	maxLength = 400,
	row:{
		name,
		value,
		type,
		prefix,
		select
	},
	setRows,
	index,
	rows,
}: {
	maxLength?: number;
	index: number;
	row: Rows;
	setRows: Dispatch<SetStateAction<Rows[]>>;
	rows: Rows[];
}) => {
	return (
		<div
			className={cn(
				"flex justify-between pt-1 ",
				type == "image" || type == "text" ? "flex-col" : " gap-4  items-center"
			)}
		>
			<div className="capitalize text-gray-700 font-medium">{name}</div>
			{type == "string" ? (
				<div className="flex flex-row-reverse gap-2 items-center">
				<Input
					type="text"
					onInput={(e:any) =>{
						setRows(
							rows.map((r,i)=>
								i == index ? { ...r, value: e.currentTarget.value } : r
							)
						)
					}
					}
					className="w-[300px]"
					value={rows[index].value}
				/>
				{prefix && <div>{prefix}</div>}
				</div>
			) : type === "number" ? (
				<div className="flex flex-row-reverse gap-2 items-center">
				<Input
					
					onInput={(e:any) =>{
						setRows(
							rows.map((r,i)=>
								i == index ? { ...r, value: Number(e.currentTarget.value) as number } : r
							)
						)
					}
					}
					className="w-[300px]"
					type="number"
					value={rows[index].value}
				/>
				{prefix && <div>{prefix}</div>}
				</div>
			): type === "time" ? (
				<div className="flex flex-row-reverse gap-2 items-center">
				<Input
					onInput={(e:any) =>{
						setRows(
							rows.map((r,i)=>
								i == index ? { ...r, value: e.currentTarget.value } : r
							)
						)
					}
					}
					className="w-[300px]"
					type="time"
					value={rows[index].value}
				/>
				{prefix && <div>{prefix}</div>}
				</div>
			) : type === "boolean" ? (
				<Switch
					onCheckedChange={(e) =>
						setRows(
							rows.map((r) =>
								r.name == name
									? { ...r, value: !r.value }
									: r
							)
						)
					}
					checked={rows[index].value}
				/>
			) : type === "image" ? (
				<div className="relative">
				<UploadImage returnImage={(image)=>setRows(rows.map((r,i)=>i==index?{...r,value:image}:r))} className="absolute top-4 right-2">
						{
							({id,loading})=>{
							return (
							<Button onClick={()=>{
								// click the input file with the id
								document.getElementById(id)?.click()
							}} size={"icon"} variant={"outline"}>
								{
									loading ? <Loader size={18} className="animate-spin"/> :
									!rows[index].value ? <Upload size={18} /> :
														<Replace size={18} />
								}
							</Button>
							)
							}
						}
				</UploadImage>
				{
					rows[index].value ?
					<Image
						src={rows[index].value}
						width={300}
						height={300}
						className="w-full max-h-[400px] object-contain mt-2  border rounded-xl bg-slate-50"
						alt=""
					/>:
					<div className="w-full max-h-[400px] flex items-center justify-center text-lg object-contain mt-2 h-[300px] border rounded-xl bg-slate-50">
						Upload Image
					</div>
				}
				</div>
			) : type === "text" ? (
					<Textarea
						onInput={(e) => {
							const updatedRows = rows.map((r, i) =>
								i === index ? { ...r, value: e.currentTarget.value } : r
							);
							setRows(updatedRows);
						}}
						className="min-h-[300px] my-2 w-full"
						value={rows[index].value}
					/>
			) : 
				type === "select" ? (
					<Select defaultValue={value} onValueChange={(value : string) => setRows(rows.map((r, i) => i === index ? { ...r, value } : r))}>
						<SelectTrigger  className="w-[300px]">
							<SelectValue  placeholder={name} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>{name}</SelectLabel>
								{
									select &&
									select.map((s)=>{
										return(
											<SelectItem key={s.name} value={s.value}>{s.name}</SelectItem>
										)
									})
								}
							</SelectGroup>
						</SelectContent>
					</Select>

				):
				type === "date" ? (
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-[300px] justify-start text-left font-normal",
									!rows[index].value && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{
								isDate(rows[index].value)?
								format(new Date((rows[index].value)), "PPP"):
								rows[index].value ? format(new Date((rows[index].value as Timestamp).toDate()), "PPP") : <span>Pick a date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={rows[index].value}
								onSelect={
									(value) => setRows(
										rows.map((r, i) =>
											i === index ? { ...r, value } : r
										)
									)
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				):null
			}
		</div>
	);
};
function isDate(value: any): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}
export default InputsRow;
