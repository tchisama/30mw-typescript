"use client"
import Dvc from "@/components/DCard";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import logo from "@/public/519EahgX90L._AC_SX466_.jpg";
import vercel from "@/public/99120244Alami About.jpg";
import React, { use, useEffect } from "react";
import CreateNewDoc from "@/components/CreateNewDoc";
import { Button } from "@/components/ui/button";
import { Rows, collType } from "@/types";
import DocsList from "@/components/DocsList";
import { Box, Filter, MessagesSquare, Plus, Trash, Users } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { notFound, usePathname } from "next/navigation";
import path from "path";
import { cn } from "@/lib/utils";
import DashboardNavbar from "@/components/DashboardNavbar";
import CollectionPage from "@/components/CollectionPage";
import { collections } from "@/structer";






export default function Home() {
  const [selectedCollection, setSelectedCollection] = React.useState<collType|null>(null);
  const pathname = usePathname()
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
				<CollectionPage selectedCollection={selectedCollection}/>
			</div>
		</div>
    :null
	);
}

