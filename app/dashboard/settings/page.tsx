"use client";
import React, { use, useEffect } from "react";
import {
	CollPage,
	CustomPage as CustomPageType,
	Rows,
	collType,
} from "@/types";
import { notFound, usePathname } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import CollectionPage from "@/components/CollectionPage";
import CustomPage from "@/components/CustomPage";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useCollections } from "@/store/collections";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ViewRow from "@/components/ViewRow";
import SettingCollPage from "@/components/SettingCollPage";

export default function Page() {
	const { collections, setCollections } = useCollections();
	return (
		<div className="min-h-screen bg-slate-100">
			<div className="px-4 max-w-[2400px] mx-auto py-8 relative flex gap-2">
				<DashboardNavbar collections={collections} />
				<div className="flex-1">
					<h1 className="text-4xl">Settings</h1>
					<Separator className="my-4" />
					<h1 className="text-xl">collections</h1>
					{/* <Button
						onClick={() => {
							if (collections == null ) return;
							setCollections([
								...collections,
								{
									name: "hello",
									href: "/dashboard/hello",
									page: "collection",
									collection: "hello",
                  rows: [
                    {
                      name: "title",
                      type: "string",
                    },
                  ],
								},
							]);
						}}
					>
						make blog to hello
					</Button> */}
          <div className="grid grid-cols-2 mt-4 gap-2">
            {
              collections && collections.map((c:CollPage|CustomPageType,i)=>{
                if(c.page !== "collection") return null
                return (
                  <SettingCollPage key={i} c={c} i={i} />
                )
              })
            }
          </div>
				</div>
			</div>
		</div>
	);
}
