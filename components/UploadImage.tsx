import { cn } from '@/lib/utils'
import React from 'react'
import { Label } from './ui/label'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/firebase'
import { addDoc, collection } from 'firebase/firestore'

type Props = {
  children:({id,loading}:{id:string,loading:boolean})=>React.ReactNode
  className?: string
  folder?:string
  returnImage:(imageUrl:string)=>void
}

function UploadImage({children,returnImage,className,folder="images"}: Props) {
  const random = String(Math.random())
  const [file , setFile] = React.useState<File|null>(null)
  const [loading, setLoading] = React.useState(false)
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setLoading(true)
    if(!e.target.files) return
    const name = ""+ Date.now() as string
    const storageRef = ref(storage, `${folder}/${name}`);
    uploadBytes(storageRef, e.target.files[0] as File).then((snapshot) => {
      returnImage(`https://firebasestorage.googleapis.com/v0/b/mw-typescript.appspot.com/o/${folder}%2F${name}?alt=media&token=d849d7ec-d80e-4297-8a2e-85f5d26f4c31`)
      setLoading(false)
    })
  }
  return (
    <div className={cn(className)}>
      <input accept='image/*' id={random} onChange={onChangeFile} type="file"  hidden/>
      <Label htmlFor={random} >
        {children({id:random,loading})}
      </Label>
    </div>
  )
}

export default UploadImage