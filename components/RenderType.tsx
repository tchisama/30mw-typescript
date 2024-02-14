"use client"
import { Rows } from '@/types'
import { format } from 'date-fns'
import { Timestamp, collection, doc, getDoc, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'
import { db } from '@/firebase'

type Props = {
    row: Rows
    maxLength?: number
    typePage?: "table" | "cards"
}

function RenderType({row:{ name, reference,key,value,type,prefix}, maxLength,typePage="cards"}: Props) {
    const [category, setCategory] = React.useState<any>("")
    useEffect(() => {
        if(type=="reference"){
            if(!value) return
            if(!reference) return
            if(!key) return
            getDoc(doc(db,reference,value)).then((doc)=>{
                setCategory(doc.data() as any)
                console.log(doc.data() as any)
            })	
        }
    },[value,reference,key,type])
    return (
    <div className='overflow-hidden'>
            {type == "string" || type == "number" || type == "select" || type == "time"  ? (
                <div>{String(value).slice(0, 30)} {prefix}</div>
            ) : null}
            { type == "reference" ? (
                <div>{category?.[key]} {prefix}</div>
            ) : null}
            {type == "text" ? (
                <div
                    className="text-sm max-h-[200px] overflow-auto whitespace-normal break-all"
                    dangerouslySetInnerHTML={{
                        __html: value.slice(0, maxLength).replace(/\n/g, "<br/>"),
                    }}
                ></div>
            ) :
                type == "date" ? (
                    <div className='text-sm'>
                        {value ? format(new Date((value as Timestamp).toDate()), "dd/MM/yyyy") : "----"}
                    </div>
                )
                    : null}
            {type == "boolean" ? (
                value ? (
                    <Badge className="text-green-600" variant="outline">
                        True
                    </Badge>
                ) : (
                    <Badge className="text-red-400" variant="outline">
                        False
                    </Badge>
                )
            ) : null}
            {type == "image" ? (
                value ?
                <Image
                    src={value}
                    width={typePage == "table" ? 60 : 300}
                    height={typePage == "table" ? 60 : 300}
                    className={
                        cn("w-full  max-h-[300px] object-contain mt-2 border rounded-xl bg-slate-50",
                            typePage == "table" ? "max-w-[60px]" : ""
                        )}
                    alt=""
                />
                :<div
                    className={
                        cn("w-full aspect-square max-h-[300px] flex justify-center items-center object-contain mt-2 border rounded-xl bg-slate-50",
                            typePage == "table" ? "max-w-[60px]" : ""
                        )}
                ><ImageIcon size={30} strokeWidth={1} color='#555' /></div>
            ) : null}
    </div>
)
}

export default RenderType