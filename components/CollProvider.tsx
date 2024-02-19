"use client";
import { db } from '@/firebase';
import { useCollections } from '@/store/collections';
import { collType } from '@/types';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { Home } from 'lucide-react';
import React, { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const CollProvider = ({children}: Props) => {
  const {setCollections} = useCollections()

  useEffect(() => {
    // i want to change it to snapshot 

    // getDocs(collection(db, "collections")).then(
    //   (c) => {
    //     const dataColls = c.docs
    //     setCollections(dataColls.map((d) => {
    //         const data = d.data()
    //         console.log(data)
    //           return ({
    //               ...data,
    //               id: d.id,
    //               icon: (p) => <Home {...p}/>,
    //               rows: JSON.parse(data?.rows as string),
    //           } as collType)
    //         }
    //       ))
    //   }
    // )

    onSnapshot(collection(db, "collections"), (c) => {
      const dataColls = c.docs
      setCollections(dataColls.map((d) => {
          const data = d.data()
          console.log(data)
            return ({
                ...data,
                id: d.id,
                icon: (p) => <Home {...p}/>,
                rows: JSON.parse(data?.rows as string),
            } as collType)
          }
        ))
    })
  },[setCollections])
  return (
    <div>
    {children}
    </div>
  )
}

export default CollProvider