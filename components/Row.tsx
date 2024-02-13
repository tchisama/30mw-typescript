import Image from 'next/image';
import React from 'react'
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

const Row = ({
	name,
	value,
	maxLength = 400,
	type,
	prefix,
}: {
	name: string;
	value: any;
	maxLength?: number;
	type: "string" | "number" | "image" | "text" | "boolean";
	prefix?: string;
}) => {
	return (
		<div
			className={cn(
				"flex justify-between ",
				type == "image" || type == "text" ? "flex-col" : " items-center"
			)}
		>
			<div className=" capitalize font-medium">{name}</div>
			{type == "string" || type == "number" ? (
				<div>{String(value).slice(0, 30)} {prefix}</div>
			) : null}
			{type == "text" ? (
				<div
					className="text-sm whitespace-normal break-all"
					dangerouslySetInnerHTML={{
						__html: value.slice(0, maxLength).replace(/\n/g, "<br/>"),
					}}
				></div>
			) : null}
			{type == "boolean" ? (
				value ? (
					<Badge className=" text-green-600" variant="outline">
						True
					</Badge>
				) : (
					<Badge className=" text-red-400" variant="outline">
						False
					</Badge>
				)
			) : null}
			{type == "image" ? (
				<Image
					src={value}
					width={300}
					height={300}
					className="w-full aspect-square max-h-[400px] object-contain mt-2 p-3 border rounded-xl bg-slate-50"
					alt=""
				/>
			) : null}
		</div>
	);
};

export default Row