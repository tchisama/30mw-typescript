"use client"
import React, { use, useEffect } from "react";
import { CollPage, CustomPage as CustomPageType, Rows, collType } from "@/types";
import { notFound, usePathname } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import CollectionPage from "@/components/CollectionPage";
import CustomPage from "@/components/CustomPage";
import path from "path";
import { useCollections } from "@/store/collections";






export default function Home() {
  const [selectedCollection, setSelectedCollection] = React.useState<collType|null>(null);
  const {collections} = useCollections()
  const pathname = usePathname()
  useEffect(()=>{
    if(!pathname) return
    if(!collections) return
    const foundCollection = collections.find((c)=>c.href===pathname) || null
    // if(pathname !== "/dashboard/settings"){
    //   if(!foundCollection) return notFound()
    // }
    setSelectedCollection(foundCollection)
  },[pathname,selectedCollection,collections])
	return (
    selectedCollection ?
		<div className="min-h-screen bg-slate-100">
			<div className="px-4 max-w-[2400px] mx-auto py-8 relative flex gap-2">
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

