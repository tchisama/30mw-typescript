import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteDoc from './DeleteDoc'
import { Dialog } from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import EditDoc from './EditDoc'
import { Copy, Pencil, Trash } from 'lucide-react'
import { Rows } from '@/types'

type Props = {
  children: React.ReactNode
  id:string
  rows:Rows[]
  collection:string,
}

function ControlDoc({children,rows,collection,id}: Props) {
  const iconsSize = 18
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-[170px]'>
        <DropdownMenuLabel>Document Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditDoc collection={collection} id={id} rows={rows}>
          <Button variant={"ghost"} className={"w-full p-2 py-2 h-fit justify-start gap-2"}>
            <Pencil size={iconsSize}/> Edit
          </Button>
        </EditDoc>
        <Button variant={"ghost"} className={"w-full p-2 py-2 h-fit justify-start gap-2"}>
          <Copy size={iconsSize}></Copy>
          Duplicate
        </Button>
        <DeleteDoc collection={collection} id={id}>
          <Button variant={"ghost"} className={"w-full bg-red-50 hover:text-red-600 gap-2 hover:bg-red-100 text-red-500 p-2 py-2 h-fit justify-start"}>
            <Trash size={iconsSize}/> Delete
          </Button>
        </DeleteDoc>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ControlDoc