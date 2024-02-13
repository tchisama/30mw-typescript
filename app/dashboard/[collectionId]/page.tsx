"use client"
import Dvc from "@/components/DCard";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import logo from "@/public/519EahgX90L._AC_SX466_.jpg";
import vercel from "@/public/99120244Alami About.jpg";
import React, { useEffect } from "react";
import CreateNewDoc from "@/components/CreateNewDoc";
import { Button } from "@/components/ui/button";
import { Rows } from "@/types";
import DocsList from "@/components/DocsList";
import { Box, Filter } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const TestRows:Rows[] = [
	{
		name: "image",
		type: "image",
	},
	{
		name: "name",
		type: "string",
	},
	{
		name:"category",
		type:"select",
		select:[
			{
				name:"test",
				value:"test"
			},
			{
				name:"test2",
				value:"test2"
			}
		]
	},
	{
		name: "price",
		type: "number",
		prefix: "dh",
	},
	{
		name: "createdAt",
		type: "date",
	},
	{
		name:"time",
		type:"time",
	},
	{
		name: "inStock",
		type: "boolean",
	},
	{
		name:"description",
		type:"text",
	},
]

const iconsSize = 18

const collections = [
	{
		name:"Products",
		collection:"products",
		icon:<Box size={iconsSize}/>,
		rows:TestRows
	}	
]


export default function Home() {
	return (
		<div className="min-h-screen bg-slate-50">
			<div className="container py-8 relative flex gap-2">
				<div className="w-[300px] sticky top-2 h-fit p-4">
					<div className="flex flex-col my-6">
						<h1 className="text-3xl uppercase font-bold">Logo</h1>
						<h1 className="text-xs uppercase font-bold">sulogo</h1>
					</div>
					{
						collections.map((C,i)=>{
							return (
								<Link key={i} href={"/dashboard"+C.collection}>
									<div className="flex gap-2 items-center">{C.icon} {C.name}</div>
								</Link>
							)
						})
					}
				</div>
				<div className="relative">
					<div className=" sticky top-0 z-20 bg-slate-50">
						<div className="flex py-4  gap-2 justify-between">
							<h1 className="text-4xl">Name</h1>
							<div className="flex gap-2">
								<CreateNewDoc rows={TestRows} collection={"test"} >
									<Button>Create New</Button>
								</CreateNewDoc>
							</div>
						</div>
						<div className="flex pb-4 gap-2 justify-end">
								<Input placeholder="Search" className="w-fit"/>
								<Button size={"icon"} className="" variant={"outline"}><Filter size={18}/></Button>
						</div>
					</div>
					<DocsList coll="test" rows={TestRows} />
				</div>
			</div>
		</div>
	);
}

