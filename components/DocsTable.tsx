"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Rows, RowsTypes } from '@/types'
import RenderType from './RenderType'
import { db } from '@/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import ViewRow from './ViewRow'
import ControlDoc from './ControlDoc'
import { Button } from './ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Badge } from './ui/badge'

type Props = {
  rows:Rows[],
  coll:string
  search?:string
  deleted:boolean
  showedRows?: {[key:string]:boolean}
}

const DocsTable = ({rows,search ,showedRows,deleted, coll}: Props) => {
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
                console.log(d.data())
                return { ...d.data(),rows:JSON.parse(d.data().rows), id: d.id };
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
  <Table className='bg-white p-2 rounded border'>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        {
          rows.map((row) => (
            showedRows?.[row.name] ?
            <TableHead key={row.name}>{row.name}</TableHead>
            :null
          ))
        }
            <TableHead className='text-right'>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        dsWithSearch && 
        dsWithSearch.map((row,i) => (
            <TableRow key={row.id} className='relative'>
              {
                showedRows&&
                Object.keys(showedRows).map((key) =>{
                  let name:string = key
                  let reference:string = rows.find(r=>r.name==key)?.reference as string
                  let _key:string = rows.find(r=>r.name==key)?.key as string
                  let _type = rows.find(r=>r.name==key)?.type as RowsTypes
                  let value = dsWithSearch[i].rows.find((r:Rows)=>r.name==key)?.value
                  console.log(_type)
                  let prefix = rows.find(r=>r.name==key)?.prefix
                  if(_type === "object") {
                    value = "object"
                    _type = "string"
                  }
                  if(_type === "array") {
                    value = value.length + " items in " +  name
                    _type = "string"
                  }

                  return (
                    showedRows[key]&&
                    <TableCell key={key} className="font-medium">
                      <RenderType typePage="table" maxLength={30} row={{name:key,reference,key:_key,value,prefix,type:_type}} />
                    </TableCell>
                  )
                })
              }
              {
                row.deleted &&
                deleted ?
                <Badge className="absolute hover:bg-transparent text-red-500 bg-transparent top-1 left-2">deleted</Badge>
                :null
              }

              <TableCell  className="font-medium flex justify-end">
                <ControlDoc deleted={deleted} collection={coll} rows={rows.map((r)=>{return {...r,value:row[r.name]}})} id={row.id}>
                    <Button size={"icon"} className="" variant={"outline"}><MoreHorizontal size={18} /></Button>
                </ControlDoc>
              </TableCell>
            </TableRow>
        ))
      }
    </TableBody>
  </Table>

  )
}

export default DocsTable