"use client"
import React, { use, useEffect } from "react";
import { CollPage, CustomPage as CustomPageType, Rows, collType } from "@/types";
import { notFound, usePathname } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import CollectionPage from "@/components/CollectionPage";
import { collections } from "@/structer";
import CustomPage from "@/components/CustomPage";






export default function Home() {
  const [selectedCollection, setSelectedCollection] = React.useState<collType|null>(null);
  const pathname = usePathname()
  console.log(pathname)
  useEffect(()=>{
    if(!pathname) return
    const foundCollection = collections.find((c)=>c.href===pathname) || null
    if(!foundCollection) return notFound()
    setSelectedCollection(foundCollection)
  },[pathname,selectedCollection])
	return (
    selectedCollection ?
		<div className="min-h-screen bg-slate-50">
			<div className="px-4 max-w-[1800px] mx-auto py-8 relative flex gap-2">
        <DashboardNavbar collections={collections}/>
        {
          selectedCollection.page==="collection" ?
          <CollectionPage selectedCollection={selectedCollection as CollPage}/>
          : selectedCollection.page==="custom"?
          <CustomPage selectedCollection={selectedCollection as CustomPageType}/>
          :null
        }

			</div>
		</div>
    :null
	);
}

