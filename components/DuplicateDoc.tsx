import { db } from '@/firebase'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import React from 'react'

type Props = {
  children: React.ReactNode
  collection:string
  id:string
}

function DuplicateDoc({children,collection:_collection,id}: Props) {
  const duplicate = ()=>{
    getDoc(doc(db, _collection, id)).then((doc)=>{
      addDoc(
        collection(db, _collection),
        doc.data()
      )
    })
  }
  return (
    <div onClick={duplicate}>{children}</div>
  )
}

export default DuplicateDoc