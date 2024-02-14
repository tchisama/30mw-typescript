import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { CopyX, Eye, EyeOff, Filter, Plus, Rows, Trash, X } from 'lucide-react'
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
  useEffect(()=>{
    let newShowedRows:{[key:string]:boolean} = {}
    selectedCollection?.rows.forEach(r=>{
      newShowedRows[r.name] = true
    })
    setShowedRows(
      newShowedRows
    )
  },[selectedCollection])
  return (
    selectedCollection ?
				<div className="relative flex-1">
					<div className=" sticky border-b top-0 z-20 bg-slate-100">
						<div className="flex py-4  gap-2 justify-between">
							<h1 className="text-4xl">{selectedCollection.name}</h1>
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
						<div className="flex pb-4 gap-2 justify-end">
								<Input value={search} onInput={(e:any)=>setSearch(e.target.value)} placeholder="Search" className="w-fit md:min-w-[400px]"/>
                <RowsFilter showedRows={showedRows} setShowedRows={setShowedRows}>
                  <Button size={"icon"} className="" variant={"outline"}><Filter size={18}/></Button>
                </RowsFilter>
						</div>
					</div>
          <div className='py-2'>
          {
            selectedCollection?.type === "table" ?
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