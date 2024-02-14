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

function ViewRow({row:{name,value,type,prefix},maxLength=400}: Props) {
  return (
        <div
            className={cn(
                "flex justify-between text-gray-500  ",
                type == "image" || type == "text" ? "flex-col" : " items-center"
            )}
        >
            <div className="capitalize text-gray-600 font-medium">{name}</div>
            <RenderType row={{name,value,type,prefix}} maxLength={maxLength} />
        </div>
  )
}

export default ViewRow