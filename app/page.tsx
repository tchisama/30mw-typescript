"use client"
import Dvc, { Rows } from "@/components/DCard";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import logo from "@/public/519EahgX90L._AC_SX466_.jpg";
import vercel from "@/public/99120244Alami About.jpg";
import React, { useEffect } from "react";
import CreateNewDoc from "@/components/CreateNewDoc";
import { Button } from "@/components/ui/button";


type dtype = {
	name: string;
	description: string;
	price : number;
	inStock: boolean;
	image: string;
	show: boolean;
	id: string;
}



const TestRows:Rows[] = [
	{
		name: "name",
		type: "string",
	},
	{
		name: "price",
		type: "number",
	},
	{
		name: "inStock",
		type: "boolean",
	},
	{
		name:"description",
		type:"text",
	}
]

export default function Home() {
	const [ds, setDs] = React.useState<dtype[]>()
	useEffect(()=>{
		// getDoc(doc(db, "test", "2Wdv5UFK6qpQgsTViYBc")).then((_d)=>{
		// 		setD({..._d.data()as dtype,id:_d.id})
		// })
		getDocs(collection(db, "test")).then((_d)=>{
			// for each
			setDs(_d.docs.map((d)=>{
				return {...d.data() as dtype,id:d.id}
			}))
		})
	},[])
	return (
		ds &&
		<div className="flex gap-4 p-2">
			{
				ds.map((d)=>{
					return <Dvc key={d.id} 
					id={d.id}
					collection={"test"}
					rows={
						TestRows.map((r)=>{
							return {
								...r,
								value:d[r.name as keyof dtype],
								prefix:r.name=="price"?"dh":""
							}
						})
					}

					/>
				})
			}
			<CreateNewDoc rows={TestRows} collection={"test"} >
				<Button>Create</Button>
			</CreateNewDoc>
		</div>
	);
}
