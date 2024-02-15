// import { Rows } from '@/types'
// import React from 'react'
// import InputsRow from './InputsRow'

// type Props = {
//   row:Rows
// }

// const ObjectRow = ({row:{object}}: Props) => {


//   const handleChange = (indices: number[], value: string) => {
//       const newArray = [...nestedArray];
//       let currentLevel: any = newArray;

//       // Traverse the nested array based on indices and update the value
//       for (let i = 0; i < indices.length - 1; i++) {
//         currentLevel = currentLevel[indices[i]];
//       }
//       currentLevel[indices[indices.length - 1]] = value;

//       setNestedArray(newArray);
//   };
//   return (
//             <div className='p-2 bg-slate-50 mt-2 border rounded-md flex flex-col '>
//                 {
//                     Array.isArray(object) &&
//                         object?.map((a:Rows, i:number) => (
//                                 <InputsRow key={i} row={a} />
//                     ))
//                 }
//             </div>
//   )
// }

// export default ObjectRow