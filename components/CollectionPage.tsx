import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { CopyX, Eye, EyeOff, Filter, Grid, LayoutGrid, List, Plus, Rows, Trash, X } from 'lucide-react'
import CreateNewDoc from './CreateNewDoc'
import { Input } from './ui/input'
import DocsList from './DocsList'
import { CollPage, collType } from '@/types'
import { cn } from '@/lib/utils'
import CleanTrash from './CleanTrash'
import RowsFilter from './RowsFilter'
import DocsTable from './DocsTable'
type Props = {
  selectedCollection: CollPage | null
}

function CollectionPage({selectedCollection}: Props) {
  const [search, setSearch] = React.useState("")
  const [showDeleted, setShowDeleted] = React.useState(false)
  const [showedRows, setShowedRows] = React.useState<{[key:string]:boolean}>()
  const [pageType,setPageType] = React.useState<"cards"|"table">()
  useEffect(()=>{
    let newShowedRows:{[key:string]:boolean} = {}
    selectedCollection?.rows.forEach(r=>{
      newShowedRows[r.name] = true
    })
    setPageType(selectedCollection?.type as "cards"|"table")
    setShowedRows(
      newShowedRows
    )
  },[selectedCollection])
useEffect(() => {
  // Save showedRows to localStorage
  if (showedRows && selectedCollection?.collection) {
    localStorage.setItem("showedRows::" + selectedCollection.collection, JSON.stringify(showedRows));
  }
}, [showedRows, selectedCollection]);

useEffect(() => {
  // Retrieve showedRows from localStorage
  if (selectedCollection?.collection) {
    const _showedRows = localStorage.getItem("showedRows::" + selectedCollection.collection);
    if (_showedRows) {
      setShowedRows(JSON.parse(_showedRows));
    }
  }
}, [selectedCollection]);

useEffect(() => {
  // Save pageType to localStorage 
  if (pageType && selectedCollection?.collection) {
    localStorage.setItem("pageType::" + selectedCollection.collection, pageType);
  }
},[pageType, selectedCollection]);
useEffect(() => {
  // Retrieve pageType from localStorage
  if (selectedCollection?.collection) {
    const _pageType = localStorage.getItem("pageType::" + selectedCollection.collection);
    if (_pageType) {
      setPageType(_pageType as "cards"|"table");
    }else{
      setPageType("cards");
    }
  }
}, [selectedCollection]);

  return (
    selectedCollection ?
				<div className="relative flex-1">
						<div className="flex py-4  gap-2 justify-end">
							<div className="flex gap-2">
                {
                  showDeleted ?
                  <CleanTrash collection={selectedCollection.collection} >
                    <Button className='gap-2 text-red-600' variant={"outline"} ><CopyX size={18}/> Clean Trash</Button>
                  </CleanTrash>
                  :null
                }
                <Button onClick={()=>setShowDeleted(!showDeleted)} variant={"outline"} className={cn("gap-2")}>
                  {
                    showDeleted ?
                    <>
                      <X size={18}/>
                      Close Trash
                    </>
                    :
                    <>
                      <Trash size={18}/>
                      Open Trash
                    </>
                  }
                </Button>
								<CreateNewDoc rows={selectedCollection.rows} collection={selectedCollection?.collection} >
									<Button className="gap-2"><Plus size={18}/>Create New</Button>
								</CreateNewDoc>
							</div>
						</div>
					<div className=" flex justify-between items-end sticky border-b top-0 z-20 bg-slate-100">
						<h1 className="text-4xl my-auto">{selectedCollection.name}</h1>
						<div className="flex py-4 gap-2 justify-end">
                <div  className='gap-1 border flex bg-white rounded-2xl p-[2px] items-center px-1'>
                  <Button onClick={() => setPageType("table")} size={"icon"} className='w-8 h-8' variant={pageType === "cards" ? "ghost" : "default"}><List size={18}/></Button>
                  <Button onClick={() => setPageType("cards")} size={"icon"} className='w-8 h-8' variant={pageType === "table" ? "ghost" : "default"}><LayoutGrid size={18}/></Button>
                </div>
								<Input value={search} onInput={(e:any)=>setSearch(e.target.value)} placeholder="Search" className="w-fit md:min-w-[400px]"/>
                <RowsFilter showedRows={showedRows} setShowedRows={setShowedRows}>
                  <Button size={"icon"} className="" variant={"outline"}><Filter size={18}/></Button>
                </RowsFilter>
						</div>
					</div>
          <div className='py-2'>
          {
            pageType == "table" ?
            <DocsTable rows={selectedCollection?.rows} showedRows={showedRows} coll={selectedCollection?.collection} deleted={showDeleted} search={search} />
            :
            <DocsList showedRows={showedRows} deleted={showDeleted} search={search} coll={selectedCollection?.collection} rows={selectedCollection?.rows} />
          }
          </div>
        </div>
      :null
  )
}

export default CollectionPage