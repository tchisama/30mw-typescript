export type RowsTypes = "string" | "number" | "image" | "text" | "boolean" | "date" | "time" | "select"|"reference"|"array" | "object" | "avatar"
export type Rows={
		name: string;
		value?: any;
		type: RowsTypes
		prefix?: string | React.ReactNode;
		select?:{
			name:string
			value:any
		}[]
		reference?:{collection:string,key:string};
		array?:Rows[]
		object?:Rows[]
}
export type collType = CollPage | CustomPage

export type CustomPage = {
	name:string
	icon:(p?:any)=>React.ReactNode
	href:string
	page:"custom"
	sections:CustomSection[]
	id:string
}

export type CollPage = {
	page:"collection"
  name:string
  collection:string
  // icon:React.ReactNode
	icon:(p?:any)=>React.ReactNode
	type?:"table"|"cards"
  rows:Rows[]
  href:string
	id:string
}


type CustomSection = AnalyticsCards 


export type AnalyticsCards = {
	type:"analyticsCards"
	name:string
	cards:{
		name: string;
		subtitle: string;
		collection: string;
		icon?: React.ReactNode;
	}[]
}