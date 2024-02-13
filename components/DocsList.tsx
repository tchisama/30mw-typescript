"use client"
import Dvc from "@/components/DCard";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import CreateNewDoc from "@/components/CreateNewDoc";
import { Button } from "@/components/ui/button";
import { Rows } from "@/types";

type Props = {
  rows:Rows[],
  coll:string
}





function DocsList({rows , coll}: Props) {
	const [ds, setDs] = React.useState<any[]>()
	useEffect(()=>{
		// getDoc(doc(db, "test", "2Wdv5UFK6qpQgsTViYBc")).then((_d)=>{
		// 		setD({..._d.data()as dtype,id:_d.id})
		// })
		getDocs(collection(db, coll)).then((_d)=>{
			// for each
			setDs(_d.docs.map((d)=>{
				return {...d.data(),id:d.id}
			}))
		})
	},[coll])
  return (
		ds &&
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
  )
}

export default DocsList