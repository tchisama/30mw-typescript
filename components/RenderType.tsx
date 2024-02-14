import { Rows } from '@/types'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import React from 'react'
import { Badge } from './ui/badge'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'

type Props = {
  row: Rows
  maxLength?: number
  typePage?: "table" | "cards"
}

function RenderType({row:{ name,value,type,prefix}, maxLength,typePage="cards"}: Props) {
  return (
    <>
            {type == "string" || type == "number" || type == "select" || type == "time" ? (
                <div>{String(value).slice(0, 30)} {prefix}</div>
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
                      cn("w-full aspect-square max-h-[300px] object-contain mt-2 border rounded-xl bg-slate-50",
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
    </>
  )
}

export default RenderType