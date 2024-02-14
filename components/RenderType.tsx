import { Rows } from '@/types'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import React from 'react'
import { Badge } from './ui/badge'
import Image from 'next/image'

type Props = {
  row: Rows
  maxLength?: number
}

function RenderType({row:{ name,value,type,prefix}, maxLength}: Props) {
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
                <Image
                    src={value}
                    width={300}
                    height={300}
                    className="w-full aspect-square max-h-[300px] object-contain mt-2 border rounded-xl bg-slate-50"
                    alt=""
                />
            ) : null}
    </>
  )
}

export default RenderType