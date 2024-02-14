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
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

type Props = {
  children: React.ReactNode
  collection:string,
  id:string
  deleteForEver?:boolean
  restore?:boolean
}

const DeleteDoc = ({children,collection,id,deleteForEver=false,restore=false}: Props) => {
  const _deleteDoc = ()=>{
    if(deleteForEver){
      deleteDoc(
        doc(db, collection, id)
      )
    }else{
      if(restore){
        updateDoc(
          doc(db, collection, id),
          {
            deleted: false
          }
        )
      }else{
        updateDoc(
          doc(db, collection, id),
          {
          deleted: true,
          deletedAt: new Date()
          }
        )
      }
    }
  }

  return (
    restore ?
    <div onClick={_deleteDoc}>{children}</div>
    :
<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you Sure ?</DialogTitle>
    </DialogHeader>
    <DialogDescription>{
          deleteForEver?
            "This action is permanent and will delete the document forever"
            :
            "you can get it back in anytime from the trash section"
      }</DialogDescription>
    <DialogFooter>
      <DialogClose>
          <Button variant={"ghost"}>cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button onClick={_deleteDoc} variant={"destructive"} className='gap-2'><Trash size={18}/> 
          {deleteForEver ? "Delete Forever" : "Delete"}</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default DeleteDoc