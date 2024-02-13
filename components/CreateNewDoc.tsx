import React from 'react'
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
import Row from './Row'
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
  const save =()=>{
    const data:{[key:string]:any} = {}
    rowsV.forEach(r=>{
      data[r.name] = r.value
    })
    addDoc(
      collection(db, _collection),
      data
    )
  }
  return (
<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent className='max-h-[90vh] max-w-[600px]'>
    <DialogHeader>
      <DialogTitle>Create New Document</DialogTitle>
    </DialogHeader>
      <ScrollArea className='h-[70vh] px-0'>
      <DialogDescription className='px-4'>
				{rows &&
					rows.map((r, i) => (
						<div
							className={cn(
								"border-b pb-2 pt-1",
								i + 1 == rows.length && "border-b-0 pb-0"
							)}
							key={name + "::" + i}
						>
							<InputsRow row={r} index={i} setRows={setRowsV} rows={rowsV}    />
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