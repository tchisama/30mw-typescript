'use client'
import { cn } from '@/lib/utils'
import { collType } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from './ui/button'
import { Bell, Settings } from 'lucide-react'
import logo from '@/public/logo.png'
import Image from 'next/image'
import { Separator } from './ui/separator'

type Props = {
  collections: collType[] | null
}

const DashboardNavbar = (props: Props) => {
  const pathname = usePathname()
  return (
				<div className="w-[250px] gap-1 flex flex-col h-full sticky min-h-[90vh] bg-white py-6 rounded-xl border mr-4 top-8 p-4">
					<div>
						<div className='flex gap-2 items-center mb-12'>
							<Image src={logo} alt="logo" className='h-fit w-fit' width={40} height={40} />
							<div className="flex flex-col text-primary  ">
								<h1 className="text-xl uppercase ">30mw</h1>
								<h1 className="text-xs uppercase ">typescript</h1>
							</div>
						</div>
						<div className="flex flex-col gap-1">
						{
							props.collections &&
							props.collections.map((C,i)=>{
								return (
									<Link className=" " key={i} href={C.href}>
										<div className={cn("flex py-2 capitalize gap-2 items-center p-2 px-4 rounded-xl duration-150 hover:bg-slate-100 ", pathname== C.href && "bg-primary/90 hover:bg-primary text-white")}>{C.icon({size:18})} {C.name}</div>
									</Link>
								)
							})
						}
						</div>
					</div>
					<Link className="mt-auto" href={"/dashboard/notification"}>
						<div className={cn("flex py-2 capitalize gap-2 items-center p-2 px-4 rounded-xl duration-150 hover:bg-slate-100 ", pathname== "/dashboard/notification" && "bg-primary/90 hover:bg-primary text-white")}>
							<Bell size={18} />
							Notification
						</div>
					</Link>
					<Separator className='' />
					<Link className="" href={"/dashboard/settings"}>
						<div className={cn("flex py-2 capitalize gap-2 items-center p-2 px-4 rounded-xl duration-150 hover:bg-slate-100 ", pathname== "/dashboard/settings" && "bg-primary/90 hover:bg-primary text-white")}>
							<Settings size={18} />
							Settings
						</div>
					</Link>
					<Button variant={"outline"} className={cn("flex h-fit items-center capitalize gap-2 justify-start px-2 rounded-xl duration-150 hover:bg-slate-100 ")}>
						<Avatar className='w-8 h-8'>
							<AvatarImage  src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className='flex flex-col items-start'>
							<div className='text-sm font-medium'>Tchisama</div>
							<div className='text-xs'>Account</div>
						</div>

					</Button>
				</div>
  )
}

export default DashboardNavbar