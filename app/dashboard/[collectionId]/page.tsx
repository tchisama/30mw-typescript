"use client"
import Dvc from "@/components/DCard";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import logo from "@/public/519EahgX90L._AC_SX466_.jpg";
import vercel from "@/public/99120244Alami About.jpg";
import React, { use, useEffect } from "react";
import CreateNewDoc from "@/components/CreateNewDoc";
import { Button } from "@/components/ui/button";
import { Rows } from "@/types";
import DocsList from "@/components/DocsList";
import { Box, Filter, MessagesSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { notFound, usePathname } from "next/navigation";
import path from "path";
import { cn } from "@/lib/utils";

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
	// {
	// 	name: "price",
	// 	type: "number",
	// 	prefix: "dh",
	// },
	// {
	// 	name: "createdAt",
	// 	type: "date",
	// },
	// {
	// 	name:"time",
	// 	type:"time",
	// },
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

type collType = {
  name:string
  collection:string
  icon:React.ReactNode
  rows:Rows[]
  href:string
}
const collections = [
	{
		name:"Products",
		collection:"products",
		icon:<Box size={iconsSize}/>,
		rows:TestRows,
    href:"/dashboard/products"
	}	,
	{
		name:"Orders",
		collection:"orders",
		icon:<MessagesSquare size={iconsSize}/>,
		rows:TestRows,
    href:"/dashboard/orders"
	}	
]


export default function Home() {
  const [selectedCollection, setSelectedCollection] = React.useState<collType|null>(null);
  const pathname = usePathname()
  useEffect(()=>{
    if(!pathname) return
    const foundCollection = collections.find((c)=>c.href===pathname) || null
    if(!foundCollection) return notFound()
    setSelectedCollection(foundCollection)
  },[pathname,selectedCollection])
	return (
    selectedCollection &&
		<div className="min-h-screen bg-slate-50">
			<div className="container py-8 relative flex gap-2">
				<div className="w-[220px] sticky top-2 h-fit p-4">
					<div className="flex flex-col my-6">
						<h1 className="text-3xl uppercase font-bold">Logo</h1>
						<h1 className="text-xs uppercase font-bold">sulogo</h1>
					</div>
          <div className="flex flex-col gap-1">
					{
						collections.map((C,i)=>{
							return (
								<Link className=" " key={i} href={C.href}>
									<div className={cn("flex py-2 capitalize gap-2 items-center p-2 px-4 rounded-xl", pathname== C.href && "bg-primary  text-white")}>{C.icon} {C.name}</div>
								</Link>
							)
						})
					}
          </div>
				</div>
				<div className="relative flex-1">
					<div className=" sticky top-0 z-20 bg-slate-50">
						<div className="flex py-4  gap-2 justify-between">
							<h1 className="text-4xl">{selectedCollection.name}</h1>
							<div className="flex gap-2">
                <Button variant={"outline"} className="gap-2">
                  <Trash size={18}/>
                  View Deleted
                </Button>
								<CreateNewDoc rows={TestRows} collection={selectedCollection?.collection} >
									<Button className="gap-2"><Plus size={18}/>Create New</Button>
								</CreateNewDoc>
							</div>
						</div>
						<div className="flex pb-4 gap-2 justify-end">
								<Input placeholder="Search" className="w-fit"/>
								<Button size={"icon"} className="" variant={"outline"}><Filter size={18}/></Button>
						</div>
					</div>
					<DocsList coll={selectedCollection?.collection} rows={TestRows} />
				</div>
			</div>
		</div>
	);
}

