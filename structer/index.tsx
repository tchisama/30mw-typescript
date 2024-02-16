import { CollPage, CustomPage, Rows, collType } from "@/types";
import { Value } from "@radix-ui/react-select";
import {
	Box,
	Boxes,
	DollarSign,
	Group,
	Home,
	List,
	Star,
	Users,
} from "lucide-react";

const iconsSize = 20;
const strokeWidth = 2;





const homePage: CustomPage = {
		name: "Home",
		icon: <Home strokeWidth={strokeWidth} size={iconsSize} />,
		href: "/dashboard/home",
		page: "custom",
		sections: [
			{
				type: "analyticsCards",
				name: "Analytics",
				cards: [
					{
						name: "Products",
						subtitle: "number of all the products in the store",
						collection: "products",
						icon: <Boxes size={50} strokeWidth={1} />,
					},
					{
						name: "orders",
						subtitle: "number of all the orders you got",
						collection: "orders",
						icon: <DollarSign size={50} strokeWidth={1} />,
					},
					{
						name: "customers",
						subtitle: "number of all the customers in the store",
						collection: "customers",
						icon: <Users size={50} strokeWidth={1} />,
					},
				],
			},
		],
	}



const productPage : CollPage = {
		name: "Products",
		page:"collection",
		icon: <Boxes size={iconsSize} strokeWidth={strokeWidth}/>,
		collection:"products",
		href: "/dashboard/products",
		rows:[
			{
				name:"images",
				type:"array",
				array:[
					{
						name:"image",
						type:"image"
					}
				]
			},
			{
				name:"name",
				type:"string"
			},
			{
				name:"rating",
				type:"select",
				select:[
					{ name:"⭐", value:1 },{ name:"⭐⭐", value:2 },{ name:"⭐⭐⭐", value:3 },{ name:"⭐⭐⭐⭐", value:4 },{ name:"⭐⭐⭐⭐⭐", value:5 }
				]
			},
			{
				name:"price",
				type:"number",
				prefix:"Dh"
			},
			{
				name:"category",
				type:"reference",
				reference:{
					collection:"categories",
					key:"name"
				},
			},
			{
				name:"inStock",
				type:"boolean"
			},
		]
}

const categoryPage : CollPage = {
		name: "Categories",
		page:"collection",
		icon: <Group size={iconsSize} strokeWidth={strokeWidth}/>,
		collection:"categories",
		href: "/dashboard/categories",
		rows:[
			{
				name:"name",
				type:"string"
			},
			{
				name:"image",
				type:"image"
			}
		]
}








export const collections: collType[] = [
	homePage,
	productPage,
	categoryPage
];

