import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CollPage, Rows, collType } from "@/types";
import {
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
	Plus,
	Replace,
	Text,
	ToggleLeft,
	Trash,
	TypeIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCollections } from "@/store/collections";
import { addRow, removeRow, setName, setType, setValue } from "@/lib/utils";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Input } from "./ui/input";

type Props = {
  i:number;
	c: CollPage;
};

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
const SettingCollPage = ({ c , i:_i }: Props) => {
const [collection, setCollection] = useState<CollPage>(c);
const [firstRefresh, setFirstRefresh] = useState(false);

useEffect(() => {
  // This will prevent the useEffect from running on the initial render
  if (!firstRefresh) {
    setFirstRefresh(true);
    return;
  }

  // Your logic for updating the collection goes here

  // Uncomment the following lines when you want to update the collection in the database
  updateDoc(
    doc(db, "collections", collection.id),
    {
      ...collection,
      icon:"",
      rows: JSON.stringify(collection.rows),
    }
  );
}, [collection, firstRefresh]);
	return (
		<Card className="p-4 h-fit">
			<div className="flex gap-6">
				<div style={{ fontSize: "3rem" }}>
					{(c as CollPage).icon({ size: 40, strokeWidth: 1 })}
				</div>
				<div className="flex flex-col gap-0">
					<h1 className="text-xl  font-medium">{c.name}</h1>
					<h1 className="text-sm font-medium text-primary/60">
						{(c as CollPage).collection}
					</h1>
				</div>
			</div>
			<div className="bg-slate-50 flex flex-col border rounded-xl mt-4 p-2 pr-0">
				{collection.rows &&
					collection.rows.map((r, i) => {
						return <RenderRow setCollection={setCollection} key={i} r={r} collection={collection} i={[i]} />;
					})}
          <Button
          onClick={
            () => {
              setCollection((prev) => {
                  return {
                    ...prev,
                    rows: addRow({
                      rows: prev.rows,
                      index: [],
                      newValue: {
                        name: "hello",
                        type: "string",
                        value: "",
                      }

                    })
                  }
              });
            }
          }
           className=" mr-2 gap-2" variant={"outline"}>
            <Plus size={18} />
            add new ro
          </Button>
			</div>
		</Card>
	);
};

const RenderRow = ({ r ,collection,i:ii,setCollection }: { r: Rows , collection:CollPage,i:number[],setCollection:Function} ) => {
	const render = (a: Rows,index:number[]) => {
		const AddRelativeDiv = (children: React.ReactNode) => {
			return (
				<div className="relative flex ">
					<div className="flex-1">{children}</div>
					<EditRow r={a} index={index} setCollection={setCollection}  collection={collection}/>
				</div>
			);
		};
		if (a.type === "object") {
			return AddRelativeDiv(
				<div className="pb-2 bg-white border rounded-xl px-4   my-1 ">
					<div>
						<div className="flex justify-between py-1 border-t ">
							<div className="font-medium">{a.name}</div>
							<div className="flex gap-2 items-center">
								{a.type in icons &&
									icons[a.type as keyof typeof icons]({ size: 15 })}{" "}
								{a.type}
							</div>
						</div>
					</div>
					<div className="px-3 pr-1 bg-slate-400/10 py-2 rounded-xl">
						{a.object?.map((o, i) => {
							return render(o,[...index,i]);
						})}
					</div>
          <Button
            onClick={
              () => {
                setCollection((prev: CollPage) => {
                  return {
                    ...prev,
                    rows: addRow({
                      rows: prev.rows,
                      index,
                      newValue: {
                        name: "hello",
                        type: "string",
                        value: "",
                      }

                    }),
                  };
                });
              }
            }
            className=" mr-2 w-full mt-2 gap-2" variant={"outline"}>
              <Plus size={18} />
              add new row
          </Button>
				</div>
			);
		} else if (a.type === "array") {
			return AddRelativeDiv(
				<div className="pb-2  bg-white border rounded-xl px-4  my-1 ">
					<div>
						<div className="flex justify-between py-1 border-t ">
							<div className="font-medium">{a.name}</div>
							<div className="flex gap-2 items-center">
								{a.type in icons &&
									icons[a.type as keyof typeof icons]({ size: 15 })}{" "}
								{a.type}
							</div>
						</div>
					</div>
					<div className="px-3 bg-slate-400/10 py-2 rounded-xl pr-1">
						{a.array?.map((o, i) => {
							return render(o,[...index,i]);
						})}
					</div>
				</div>
			);
		} else if (a.type === "reference") {
			return (
				a.reference &&
				AddRelativeDiv(
					<div className="flex bg-white border rounded-xl px-4 my-1   border-t py-1 gap-2 justify-between">
						<div className="font-medium">{a.name}</div>
						<div className="flex flex-col items-end">
							<div className="flex gap-2 items-center">
								{a.type in icons &&
									icons[a.type as keyof typeof icons]({ size: 15 })}{" "}
								{a.type}
							</div>
							<div className="text-sm">
								ref of {a?.reference.key} in {a?.reference.collection}
							</div>
						</div>
					</div>
				)
			);
		} else {
			return AddRelativeDiv(
				<div className="flex border bg-white rounded-xl px-4 my-1 py-1 gap-2 justify-between">
					<div className="font-medium">
              {a.name}
          </div>
					<div className="flex gap-2 items-center">
						{a.type in icons &&
							icons[a.type as keyof typeof icons]({ size: 15 })}
						{a.type}
					</div>
				</div>
			);
		}
	};
	return render(r,ii);
};



const RowsTypes = ["string", "number", "boolean", "object", "array", "reference", "text","image","avatar","date","time"];

const EditRow = ({ r,index,setCollection,collection }: { r: Rows,index:number[],setCollection:Function , collection : CollPage}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="" variant="ghost" size={"icon"}>
					<MoreHorizontal size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Edit Row</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="flex gap-2"><Replace size={15} />Change Type </DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
                {
                  RowsTypes.map((a, i) => (
                    <DropdownMenuItem
                      key={i}
                      className="flex gap-2"
                      onClick={()=>{
                        setCollection(
                          {
                            ...collection,
                            rows:setType({rows:collection.rows,index:[...index],newValue:a})
                          }
                        )
                      }}
                    >
                      {icons[a as keyof typeof icons]({ size: 15 })}
                      {a}
                    </DropdownMenuItem>
                  ))
                }
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuItem onClick={
          ()=>{
            setCollection(
              {
                ...collection,
                rows:removeRow({rows:collection.rows,index})
              }
            )
          }
        } className="flex gap-2"> <Trash size={15} />Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SettingCollPage;
