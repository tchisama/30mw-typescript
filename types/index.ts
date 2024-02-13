export type RowsTypes = "string" | "number" | "image" | "text" | "boolean" | "date" | "time" | "select"; 
export type Rows={
		name: string;
		value?: any;
		type: RowsTypes
		prefix?: string;
		select?:{
			name:string
			value:string
		}[]
}