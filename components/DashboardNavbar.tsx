'use client'
import { cn } from '@/lib/utils'
import { collType } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  collections: collType[] | null
}

const DashboardNavbar = (props: Props) => {
  const pathname = usePathname()
  return (
				<div className="w-[220px] sticky top-2 h-fit p-4">
					<div className="flex flex-col mb-6">
						<h1 className="text-3xl uppercase font-bold">Logo</h1>
						<h1 className="text-xs uppercase font-bold">sulogo</h1>
					</div>
          <div className="flex flex-col gap-1">
					{
            props.collections &&
						props.collections.map((C,i)=>{
							return (
								<Link className=" " key={i} href={C.href}>
									<div className={cn("flex py-2 capitalize gap-2 items-center p-2 px-4 rounded-xl duration-150 hover:bg-slate-200 ", pathname== C.href && "bg-primary/90 hover:bg-primary text-white")}>{C.icon} {C.name}</div>
								</Link>
							)
						})
					}
          </div>
				</div>
  )
}

export default DashboardNavbar