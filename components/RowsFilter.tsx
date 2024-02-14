import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, X } from 'lucide-react'
import { Button } from './ui/button'

type Props = {
  children: React.ReactNode,
  showedRows:{
    [key:string]:boolean
  } | undefined
  setShowedRows:React.Dispatch<React.SetStateAction<{
    [key:string]:boolean
  } | undefined>> | undefined
}


function RowsFilter({children,showedRows,setShowedRows}: Props) {
  console.log(showedRows)
  return (
    showedRows && setShowedRows &&
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='flex flex-col p-2 min-w-[170px] w-fit'>
        {
          showedRows ? Object.keys(showedRows).map((key)=>{
            return (
              <Button size={"sm"} variant={"ghost"} onClick={
                ()=>{
                  setShowedRows({
                    ...showedRows,
                    [key]:!showedRows[key]
                  })
                }
              } key={key} className="flex items-center gap-2 justify-between">
                <div>{key}</div>
                {
                  !showedRows[key] ? " " : <Check size={18} />
                }
                </Button>
            )}):null
        }
      </PopoverContent>
    </Popover>

  )
}

export default RowsFilter