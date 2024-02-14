'use client'
import { cn } from '@/lib/utils'
import { collType } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import { Bell } from 'lucide-react'

type Props = {
  collections: collType[] | null
}

const DashboardNavbar = (props: Props) => {
  const pathname = usePathname()
  return (
				<div className="w-[220px] gap-2 flex flex-col h-full sticky min-h-[90vh] bg-white py-6 rounded-xl border mr-4 top-8 p-4">
					<div>
						<div className="flex flex-col mb-6 p-2">
							<h1 className="text-3xl uppercase font-bold">Logo</h1>
							<h1 className="text-xs uppercase font-bold">sulogo</h1>
						</div>
						<div className="flex flex-col gap-1">
						{
							props.collections &&
							props.collections.map((C,i)=>{
								return (
									<Link className=" " key={i} href={C.href}>
										<div className={cn("flex py-2 capitalize gap-2 items-center p-2 px-4 rounded-xl duration-150 hover:bg-slate-100 ", pathname== C.href && "bg-primary/90 hover:bg-primary text-white")}>{C.icon} {C.name}</div>
									</Link>
								)
							})
						}
						</div>
					</div>
					<Link className=" mt-auto" href={"/dashboard/notification"}>
						<div className={cn("flex py-2 capitalize gap-2 items-center p-2 px-4 rounded-xl duration-150 hover:bg-slate-100 ", pathname== "/dashboard/notification" && "bg-primary/90 hover:bg-primary text-white")}>
							<Bell size={18} />
							Notification
						</div>
					</Link>
					<Button variant={"outline"} className={cn("flex h-fit items-center capitalize gap-2 justify-start px-2 rounded-xl duration-150 hover:bg-slate-100 ")}>
						<Avatar className='w-8 h-8'>
							<AvatarImage  src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='flex flex-col items-start'>
							<div className='text-sm font-medium'>Tchisama</div>
							<div className='text-xs'>Acount</div>
						</div>

					</Button>
				</div>
  )
}

export default DashboardNavbar