"use client"
import Dvc from "@/components/DCard";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import CreateNewDoc from "@/components/CreateNewDoc";
import { Button } from "@/components/ui/button";
import { Rows } from "@/types";
import { ArrowUpRight, Banana } from "lucide-react";

type Props = {
  rows:Rows[],
  coll:string
}





function DocsList({rows , coll}: Props) {
	const [ds, setDs] = React.useState<any[]>()
	useEffect(()=>{
    const q = query(collection(db, coll),where("deleted", "!=", true))
    const unsub = onSnapshot(q,(doc)=>{
			setDs(doc.docs.map((d)=>{
				return {...d.data(),id:d.id}
			}))
    })
    return ()=> unsub()
	},[coll])
  return (
    ds&&
		ds?.length>0 ?
		<div className="grid p-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 ">
			{
				ds.map((d)=>{
					return <Dvc key={d.id} 
					id={d.id}
					collection={coll}
					rows={
						rows.map((r)=>{
							return {
								...r,
								value:d[r.name],
							}
						})
					}

					/>
				})
			}
		</div>
    :
    <div className="py-12 w-full gap-5 flex flex-col justify-center items-center">
      <Banana size={50} strokeWidth={1} />
      <div className="flex gap-4">
        No Documents , start by creating one
        <ArrowUpRight size={24} strokeWidth={1} />
      </div>
    </div>
  )
}

export default DocsList