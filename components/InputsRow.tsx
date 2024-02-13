import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Rows } from "./DCard";

const InputsRow = ({
	name,
	value,
	maxLength = 400,
	type,
	setRows,
	index,
	rows,
	prefix
}: {
	name: string;
	value: any;
	maxLength?: number;
	index: number;
	type: "string" | "number" | "image" | "text" | "boolean";
	setRows: Dispatch<SetStateAction<Rows[]>>;
	rows: Rows[];
	prefix?: string;
}) => {
	return (
		<div
			className={cn(
				"flex justify-between pt-1 ",
				type == "image" || type == "text" ? "flex-col" : " gap-4  items-center"
			)}
		>
			<div className="capitalize font-medium">{name}</div>
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
				<Image
					src={value}
					width={300}
					height={300}
					className="w-full max-h-[400px] object-contain mt-2 p-3 border rounded-xl bg-slate-50"
					alt=""
				/>
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
			) : null}
		</div>
	);
};

export default InputsRow;
