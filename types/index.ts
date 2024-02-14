export type RowsTypes = "string" | "number" | "image" | "text" | "boolean" | "date" | "time" | "select"|"reference"; 
export type Rows={
		name: string;
		value?: any;
		type: RowsTypes
		prefix?: string;
		select?:{
			name:string
			value:string
		}[]
		reference?:string;
		key:string;

}
export type collType = CollPage | CustomPage

export type CustomPage = {
	name:string
	icon:React.ReactNode
	href:string
	page:"custom"
	sections:CustomSection[]
}

export type CollPage = {
	page:"collection"
  name:string
  collection:string
  icon:React.ReactNode
	type?:"table"|"cards"
  rows:Rows[]
  href:string
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