import { cn } from '@/lib/utils'
import React from 'react'
import { Label } from './ui/label'

type Props = {
  children:(id:string)=>React.ReactNode
  className?: string
}

function UploadImage({children,className}: Props) {
  const random = String(Math.random())
  const [file , setFile] = React.useState<File|null>(null)
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>)=>{
    if(!e.target.files) return
    setFile(e.target.files[0])
    
  }
  return (
    <div className={cn(className)}>
      <input id={random} onChange={onChangeFile} type="file"  hidden/>
      <Label htmlFor={random} >
        {children(random)}
      </Label>
    </div>
  )
}

export default UploadImage