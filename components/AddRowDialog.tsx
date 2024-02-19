import { addRow } from '@/lib/utils';
import { useCollections } from '@/store/collections';
import { CollPage, Rows } from '@/types';
import React, { useState } from 'react'
import { Button } from './ui/button';
import {
  ArrowRight,
	Brackets,
	Calendar,
	CircleUser,
	ClockIcon,
	Group,
	Hash,
	ImageIcon,
	ListIcon,
	MoreHorizontal,
	MousePointer,
	PenLine,
	Plus,
	Replace,
	Text,
	ToggleLeft,
	Trash,
	TypeIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DialogClose } from '@radix-ui/react-dialog';

type Props = {
  children: React.ReactNode,
  index: number[],
  setCollection: Function
}


const icons = {
	string: (p: any) => <TypeIcon {...p} />,
	number: (p: any) => <Hash {...p} />,
	text: (p: any) => <Text {...p} />,
	image: (p: any) => <ImageIcon {...p} />,
	reference: (p: any) => <MousePointer {...p} />,
	select: (p: any) => <ListIcon {...p} />,
	array: (p: any) => <Brackets {...p} />,
	date: (p: any) => <Calendar {...p} />,
	boolean: (p: any) => <ToggleLeft {...p} />,
	object: (p: any) => <Group {...p} />,
	avatar: (p: any) => <CircleUser {...p} />,
	time: (p: any) => <ClockIcon {...p} />,
};
const RowsTypes = ["string", "number", "boolean", "object", "array", "reference", "text","image","avatar","date","time","select"];

const AddRowDialog = ({children,setCollection,index}: Props) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("")

  const [refCollection, setRefCollection] = useState<string>("")
  const [refKey, setRefKey] = useState<string>("")


  const { collections } = useCollections()

  const addRowFunction = () => {
        if(!name || !type) return
        if(type === "reference"){
          if(!refCollection || !refKey) return
        }
            setCollection((prev: CollPage) => {
              return {
                ...prev,
                rows: addRow({
                  rows: prev.rows,
                  index,
                  newValue: {
                    name,
                    type,
                    select:[],
                    reference:{
                      collection:refCollection,
                      key:refKey,
                    },
                  }

                }),
              };
            });
      }
  return (

<Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add new row</DialogTitle>
      <DialogDescription>
        <div className='flex gap-2'>
          <Input placeholder='name of new row' onInput={(e) => setName(e.currentTarget.value)} value={name}></Input>
          <Select onValueChange={setType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="select type" />
      </SelectTrigger>
      <SelectContent>
        {
          RowsTypes.map((t) => (
            <SelectItem className='flex gap-2 min-w-[200px]' key={t} value={t}>
              <div className='flex gap-2 justify-start items-center'>
                        {icons[t as keyof typeof icons]({ size: 15 })}
                        {t}
              </div>
            </SelectItem>
          ))
        }
                  
      </SelectContent>
    </Select>
        </div>
        {
          type === "reference" && (
            <div className='flex mt-4 gap-2'>
              <Select onValueChange={setRefCollection}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="collections" />
                </SelectTrigger>
                <SelectContent>
                  {
                    collections &&
                    collections.map((c: any) => (
                      <SelectItem className='flex gap-2 min-w-[200px]' key={c.name} value={c.collection}>
                        <div className='flex gap-2 justify-start items-center'>
                                  {c.icon({ size: 15 })}
                                  {c.name}
                        </div>
                      </SelectItem>
                    ))
                  }
                        
                </SelectContent>
              </Select>
              {
                refCollection && (
                  <Select onValueChange={setRefKey}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="key" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        collections &&
                        (collections.find((c: any) => c.collection === refCollection) as any).rows.filter((r: Rows) => !(["object","array","reference"].includes(r.type))).map((c: Rows) => (
                          <SelectItem className='flex gap-2 min-w-[200px]' key={c.name} value={c.name}>
                            <div className='flex gap-2 justify-start items-center'>
                                      {c.name}
                            </div>
                          </SelectItem>
                        ))
                      }
                            
                    </SelectContent>
                  </Select>
                )
              }
            </div>
          )
        }

      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose>
        <Button onClick={addRowFunction}>Add</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default AddRowDialog