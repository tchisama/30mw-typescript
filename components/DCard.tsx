"use client";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, MoreHorizontal } from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import Row from "./Row";
import ControlDoc from "./ControlDoc";
export type Rows={
		name: string;
		value: any;
		type: "string" | "number" | "image" | "text" | "boolean";
		prefix?: string;
}
type Props = {
	name?: string;
	description?: string;
	rows: Rows[];
	collection:string;
	className?: string;
  id:string
};

function DCard({ name,collection, description, rows, className, id}: Props) {
	return (
		<Card className={cn("w-[400px] relative h-fit ", className)}>

      <ControlDoc collection={collection} rows={rows} id={id}>
        <Button size={"icon"} className="absolute top-2 right-2" variant={"outline"}><MoreHorizontal size={18}/></Button>
      </ControlDoc>

			{name || description ? (
				<CardHeader>
					{name && <CardTitle>{name}</CardTitle>}
					{description && <CardDescription>{description}</CardDescription>}
				</CardHeader>
			) : (
				<div className="py-6"></div>
			)}
			<CardContent className=" ">
				{rows &&
					rows.map((r, i) => (
						<div
							className={cn(
								"border-b pb-2 pt-1",
								i + 1 == rows.length && "border-b-0 pb-0"
							)}
							key={name + "::" + i}
						>
							<Row prefix={r?.prefix} type={r.type} name={r.name} value={r.value} />
						</div>
					))}
			</CardContent>
		</Card>
	);
}



export default DCard;
