import React, { useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Save, Trash, Trash2 } from 'lucide-react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ScrollArea } from './ui/scroll-area'
import InputsRow from './InputsRow'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Rows } from '@/types'

type Props = {
  children: React.ReactNode
  rows:Rows[],
  collection:string,
}

const CreateNewDoc = ({children,rows,collection:_collection}: Props) => {
  const [rowsV,setRowsV] = React.useState(rows)
  const [check,setCheck] = React.useState(false)
  const save =()=>{
    addDoc(
      collection(db, _collection),
      {
        rows:JSON.stringify(rowsV),
        deleted:false
      }
    )

  }
  useEffect(()=>{
  let _check = rowsV.every(r=>{
    if(r.type==="boolean") return true
    if(r.type === "object"){
      const checkObject = (o:Rows)=>{
        o.object?.forEach((r)=>{
          if(r.type==="boolean") return true
          if(r.type === "object"){
            checkObject(r)
          }else{
            return r.value
          }
        })
      }
      checkObject(r)
    }else{
      return r.value
    }
  })
    setCheck(_check)
  },[rowsV])
  return (
<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent className='max-h-[90vh] max-w-[800px]'>
    <DialogHeader>
      <DialogTitle>Create New Document</DialogTitle>
    </DialogHeader>
      <ScrollArea className='h-[70vh] px-0'>
      <DialogDescription className='px-4 py-4'>
				{rows &&
					rows.map((r, i) => (
						<div
							className={cn(
								"border-b pb-2 pt-1",
								i + 1 == rows.length && "border-b-0 pb-0"
							)}
							key={name + "::" + i}
						>
							<InputsRow row={r} index={[i]} setRows={setRowsV} rows={rowsV}    />
						</div>
					))}
      </DialogDescription>
      </ScrollArea>
    <DialogFooter>
      <DialogClose>
          <Button variant={"ghost"}>cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button onClick={save} className='gap-2'><Save size={18}/>Save</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default CreateNewDoc