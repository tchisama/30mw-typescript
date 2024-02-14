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
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { Input } from './ui/input'

type Props = {
  children: React.ReactNode
  collection:string,
}

const CleanTrash = ({children,collection:_collection}: Props) => {
  const [text,setText] = React.useState("")
  const _deleteDocs = ()=>{
    if(text===_collection){
      const q = query(collection(db, _collection), where("deleted", "==", true));
      getDocs(q).then(
        (querySnapshot)=>{
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
          });
        }
      )
    }
  }

  return (
<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you Sure ?</DialogTitle>
    </DialogHeader>
    <DialogDescription>
      Delete all deleted documents !
      <br/>If you want to clean up your trash type 
      <span className='font-bold text-gray-800'> {_collection}</span>
      <Input value={text} onInput={(e:any)=>setText(e.target.value)} placeholder='type name of the collection' className='mt-4'/>
    </DialogDescription>
    <DialogFooter>
      <DialogClose>
          <Button variant={"ghost"}>cancel</Button>
      </DialogClose>
      <DialogClose>
        <Button onClick={_deleteDocs} variant={"destructive"} className='gap-2'><Trash size={18}/> Delete Forever</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default CleanTrash