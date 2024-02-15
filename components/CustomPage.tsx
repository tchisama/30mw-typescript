import React, {  } from 'react'
import {  CustomPage as CustomPageType, collType } from '@/types'

import AnalyticCard from './AnalyticCard'
type Props = {
  selectedCollection: CustomPageType | null
}

function CustomPage({selectedCollection}: Props) {
  return (
    selectedCollection ?
				<div className="relative flex-1">
					<div className=" sticky border-b top-0 z-20 bg-slate-100">
						<div className="flex py-4  gap-2 justify-between">
							<h1 className="text-4xl">{selectedCollection.name}</h1>
							<div className="flex gap-2"></div>
						</div>
          </div>
          <div>
            {
              selectedCollection.sections.map(
                (s,i)=>(
                  <div key={s.name}>
                    <h2 className='capitalize text-3xl py-6'>{s.name}</h2>
                    <div className='grid grid-cols-3 gap-2'>
                      {
                        s.cards.map(
                          (c,i)=>(
                            <AnalyticCard key={c.name} card={c} />
                          )
                        )
                      }
                    </div>
                  </div>
                )
              )
            }
          </div>
        </div>
        : null
  )
}

export default CustomPage