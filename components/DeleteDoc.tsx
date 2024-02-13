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
import { Trash, Trash2 } from 'lucide-react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

type Props = {
  children: React.ReactNode
  collection:string,
  id:string
}

const DeleteDoc = ({children,collection,id}: Props) => {
  const deleteDoc = ()=>{
    updateDoc(
      doc(db, collection, id),
      {
      deleted: true,
      deletedAt: new Date()
      }
    )
  }

  return (
<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you Sure ?</DialogTitle>
    </DialogHeader>
    <DialogDescription>you can get it back in anytime from the trash section</DialogDescription>
    <DialogFooter>
      <DialogClose>
          <Button variant={"ghost"}>cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button onClick={deleteDoc} variant={"destructive"} className='gap-2'><Trash size={18}/> Delete</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default DeleteDoc