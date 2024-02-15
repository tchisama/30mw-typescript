import { cn } from '@/lib/utils'
import { Rows } from '@/types'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import React from 'react'
import { Badge } from './ui/badge'
import Image from 'next/image'
import RenderType from './RenderType'

type Props = {
  row:Rows
  maxLength?:number
}

function ViewRow({row,maxLength=400}: Props) {
  return (
        <div
            className={cn(
                "flex justify-between text-gray-500  ",
                row.type == "image" || row.type == "text" || row.type == "array" || row.type == "object" ? "flex-col" : " items-center"
            )}
        >
            <div className='flex justify-between'>
              <div className="capitalize text-gray-600 font-medium">{row.name} {row.type=="object" ?":":""}</div>
              {
                row.type == "array"?
                <div className='text-sm'>
                  {row?.value?.length} items
                </div>
                :null
              }
            </div>
            <RenderType row={row as Rows} maxLength={maxLength} />
        </div>
  )
}

export default ViewRow