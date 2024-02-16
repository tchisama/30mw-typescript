"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Divide, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import ControlDoc from "./ControlDoc";
import { Rows } from "@/types";
import InputsRow from "./InputsRow";
import ViewRow from "./ViewRow";
import { Badge } from "./ui/badge";
import { Console } from "console";

type Props = {
    name?: string;
    description?: string;
    rows: Rows[];
    collection: string;
    className?: string;
    id: string;
		deleted:boolean
		showedRows?:{[key:string]:boolean}
};

function DCard({ name , deleted ,showedRows, collection, description, rows, className, id }: Props) {
	console.log(rows)
    return (
        rows &&
        <Card className={cn("w-full relative h-fit ", className)}>
						{
							deleted ?
							<Badge className="absolute hover:bg-red-50 text-red-500 border border-red-200 bg-red-50 top-4 left-4">deleted</Badge>
							:null
						}
            <ControlDoc deleted={deleted} collection={collection} rows={rows} id={id}>
                <Button size={"icon"} className="absolute top-2 right-2" variant={"outline"}><MoreHorizontal size={18} /></Button>
            </ControlDoc>
						
            {(name || description) ? (
                <CardHeader>
                    {name && <CardTitle>{name}</CardTitle>}
                    {description && <CardDescription>{description}</CardDescription>}
                </CardHeader>
            ):<div className="mt-12">
							</div>}
            <CardContent className=" ">
                {rows.map((r, i) => (
										showedRows ?(
											showedRows[r.name] &&
											<div
													className={cn(
															"border-b pb-2 pt-1",
															i + 1 == rows.length && "border-b-0 pb-0"
													)}
													key={name + "::" + i}
											>
													<ViewRow row={r} />
											</div>
										):(
											<div
													className={cn(
															"border-b pb-2 pt-1",
															i + 1 == rows.length && "border-b-0 pb-0"
													)}
													key={name + "::" + i}
											>
													<ViewRow row={r} />
											</div>
										)
                ))}
            </CardContent>
        </Card>
    );
}

export default DCard;