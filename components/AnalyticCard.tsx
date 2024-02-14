'use client'
import React, { useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

type Props = {
  card:{
    name:string
    subtitle:string
    collection:string
    icon?:React.ReactNode
  }
}

function AnalyticCard({card:{name,icon,subtitle,collection:_collection}}: Props) {
  const [value,setValue] = React.useState(0)
  useEffect(()=>{
    const q = query(collection(db, _collection), where("deleted", "==", false));
    getDocs(q).then((querySnapshot)=>{
      setValue(querySnapshot.size)
    }
    )
  },[_collection])
  return (
          <Card key={name}>
            <CardContent className='pt-4'>
              <div className='flex gap-4'>
                {
                  icon
                }
                <div>
                  <h3 className='text-xl'>{name}</h3>
                  <h3 className='text-sm'>{subtitle}</h3>
                </div>
              </div>
              <div className='text-5xl mt-2'>{value}</div>
            </CardContent>
          </Card>
  )
}

export default AnalyticCard