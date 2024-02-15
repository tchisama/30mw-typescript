"use client"
import Dvc from "@/components/DCard";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CreateNewDoc from "@/components/CreateNewDoc";
import { Button } from "@/components/ui/button";
import { Rows } from "@/types";
import { ArrowUpRight, Banana, Loader, Loader2, Search } from "lucide-react";
import { getValue } from "@/lib/utils";

type Props = {
  rows:Rows[],
  coll:string
  search?:string
  deleted?:boolean
  showedRows?: {[key:string]:boolean}
}


function DocsList({rows,search ,showedRows,deleted, coll}: Props) { 
  const [ds, setDs] = React.useState<any[]>()
  const [dsWithSearch, setDsWithSearch] = React.useState<any[]>()
  const [loading,setLoading]=useState(false)
	useEffect(()=>{
    setLoading(true)
    let q;
    if(!deleted){
        q = query(collection(db, coll),where("deleted", "!=", true))
    }else{
        q = query(collection(db, coll),where("deleted", "==", true))
    }
    const unsub = onSnapshot(q,(doc)=>{
			setDs(
        doc.docs
            .map((d) => {
                return { ...d.data(), id: d.id };
            })
      )
      setLoading(false)
    })
    return ()=> unsub()
	},[coll,deleted])
  useEffect(()=>{
    if(!ds) return
    setDsWithSearch(
      search?
      ds.filter((d) => {
                if (search) {
                    // for (const key in d) {
                    //     if (Object.prototype.hasOwnProperty.call(d, key)) {
                    //         const value = d[key as keyof typeof d];
                    //         if (typeof value === "string" && value.includes(search)) {
                    //             return true; 
                    //         }
                    //     }
                    // }
                    return JSON.stringify(d).toLowerCase().includes(search.toLowerCase())
                    // return false; 
                }
                return true; 
            })
      : ds
    )
  },[search,ds])
  return (
    loading ?
    <div className='min-h-[40vh] flex items-center justify-center'>
      <div className='flex gap-2 items-center justify-center'>
        <Loader2 className='animate-spin'/>
        loading
      </div>
    </div>
    :
    dsWithSearch&&
    (

		dsWithSearch?.length>0 ?(
		<div className="grid p-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 ">
			{
				dsWithSearch.map((d)=>{
					return <Dvc 
          deleted={d.deleted}
          showedRows={showedRows}
          key={d.id} 
					id={d.id}
					collection={coll}
					rows={
            rows.map((r,i)=>{
              if(r.type==="object"){
                const  ifObject:any = (n:Rows,dd:any)=>{
                  console.log(dd)
                  return {
                    ...n,
                    object: n.object?.map((o)=>{
                      if(o.type==="object"){
                        return ifObject(o,dd[o.name as keyof typeof d])
                      }else{
                      return {
                        ...o,
                        value:dd[o.name as keyof typeof o]
                        }
                      }
                      }
                    )
                  }
                }
                return ifObject(r,d[r.name as keyof typeof d])
              }
              else{
                return {
                  ...r,
                  value:d[r.name as keyof typeof d]
                }
              }
            })
					}

					/>
				})
			}
		</div>
    )
    :
    (
      search?
    <div className="py-12 w-full gap-5 flex flex-col justify-center items-center">
      <Search size={50} strokeWidth={1} />
      <div className="flex gap-4">
        <div>
          Search for <span className=" px-2 rounded-xl font-bold">{search}</span> , not found
        </div>
        <ArrowUpRight size={24} strokeWidth={1} />
      </div>
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
    )
  )
}

export default DocsList