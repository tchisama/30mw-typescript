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
import ViewRow from './ViewRow'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from './ui/separator'

type Props = {
    row: Rows
    maxLength?: number
    typePage?: "table" | "cards"
}

function RenderType({row, maxLength,typePage="cards"}: Props) {
    const [category, setCategory] = React.useState<any>("")
    useEffect(() => {
        if(row.type=="reference"){
            if(!row.value) return
            if(!row.reference) return
            if(!row.key) return
            getDoc(doc(db,row.reference,row.value)).then((doc)=>{
                setCategory(doc.data() as any)
                console.log(doc.data() as any)
            })	
        }
    },[row])
    return (
    <div className=''>
            {row.type == "string" || row.type == "number" || row.type == "select" || row.type == "time"  ? (
                <div>{String(row.value).slice(0, 30)} {row.prefix}</div>
            ) : null}
            { row.type == "reference" ? (
                <div>{category?.[row.key]} {row.prefix}</div>
            ) : null}
            {row.type == "text" ? (
                row.value &&
                <div
                    className="text-sm max-h-[200px] overflow-auto whitespace-normal break-all"
                    dangerouslySetInnerHTML={{
                        __html: row.value.slice(0, maxLength).replace(/\n/g, "<br/>"),
                    }}
                ></div>
            ) :
                row.type == "date" ? (
                    <div className='text-sm'>
                        {row.value ? format(new Date((row.value as Timestamp).toDate()), "dd/MM/yyyy") : "----"}
                    </div>
                )
                    : null}
            {row.type == "boolean" ? (
                row.value ? (
                    <Badge className="text-green-600" variant="outline">
                        True
                    </Badge>
                ) : (
                    <Badge className="text-red-400" variant="outline">
                        False
                    </Badge>
                )
            ) : null}
            {row.type == "image" ? (
                row.value ?
                <Image
                    src={row.value}
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


            {row.type == "array" ? (
                row.array &&
                    <Carousel className='p-2 min-h-20 bg-slate-50 mt-2 border rounded-md flex flex-col gap-2'>
                        <CarouselContent>
                            {
                                Array.isArray(row.value) &&
                                row?.value?.length > 0 ?
                                row.value?.map((a:any, i:number) => (
                                    <CarouselItem key={i}>
                                        <div key={i} className='p-1 px-2 bg-white border  rounded-md'>
                                            <ViewRow row={a} />
                                        </div>
                                    </CarouselItem>
                                ))
                                :
                                <div className="flex items-center justify-center w-full h-16">
                                    <div className='p-1 px-3 bg-white border  rounded-md'>No data</div>
                                </div>
                            }
                        </CarouselContent >
                        <CarouselPrevious className='absolute top-1/2 -translate-y-1/2 left-1'/>
                        <CarouselNext  className='absolute top-1/2 -translate-y-1/2 right-1'/>
                    </Carousel>

            ) : null}


            {row.type == "object" ? (
                row.object &&
                <div className='py-2  pr-2 pl-4 bg-slate-400/5 mt-2 border rounded-md flex flex-col '>
                    {
                        Array.isArray(row.object) &&
                            row.object?.map((a:Rows, i:number) => (
                                <div key={i}>
                                    <ViewRow  row={a} />
                                    {
                                        row?.object &&
                                        i < row?.object?.length - 1 &&
                                        <Separator	className="my-1 mt-2"/>
                                    }
                                </div>
                        ))
                    }
                </div>
            ) : null}

    </div>
)
}

export default RenderType