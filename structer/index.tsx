import { Rows, collType } from "@/types";
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

const iconsSize = 18;
export const collections: collType[] = [
	{
		name: "Home",
		icon: <Home size={iconsSize} />,
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
	},
	{
		name: "Products",
		page: "collection",
		collection: "products",
		icon: <Box size={iconsSize} />,
		type: "table",
		rows: [
			{
				name: "image",
				type: "image",
			},
			{
				name: "name",
				type: "string",
			},
			{
				name: "description",
				type: "text",
			},
			{
				name: "price",
				type: "number",
				prefix: "Dh",
			},
			{
				name: "category",
				type: "reference",
				reference: "categories",
				key: "name",
			},
			{
				name: "stock",
				type: "number",
				prefix: "items",
			},
			{
				name: "featured",
				type: "boolean",
			},
		] as Rows[],
		href: "/dashboard/products",
	},
	{
		name: "Orders",
		collection: "orders",
		page: "collection",
		icon: <Boxes size={iconsSize} />,
		// type: "table",
		rows: [

			{
				name: "customer",
				type: "string",
			},
			{
				name: "object",
				type: "object",
				object: [
					{
						name: "product",
						type: "string",
					},
          {
            name: "inStock",
            type: "boolean",
          },
        {
          name: "object number 2",
          type: "object",
          object: [
            {
              name: "product",
              type: "string",
            },

            {
              name: "inStock",
              type: "boolean",
            },
          ],
        },
				],
			},
		] as Rows[],
		href: "/dashboard/orders",
	},
	{
		name: "Customers",
		collection: "customers",
		page: "collection",
		icon: <Users size={iconsSize} />,
		rows: [
			{
				name: "firstName",
				type: "string",
			},
			{
				name: "isActive",
				type: "boolean",
			},
			{
				name: "email",
				type: "string",
			},
      {
        name:"work",
        type:"object",
        object:[
      {
        name:"address",
        type:"object",
        object:[
          {
            name:"country",
            type:"object",
            object:[
              {
                name:"name",
                type:"string",
              },
              {
                name:"code",
                type:"string",
              },
            ]
          },
          {
            name:"city",
            type:"string",
          },
        ]
      },
          {
            name:"company",
            type:"string",
          },
          {
            name:"position",
            type:"string",
          }
        ]
      },
			{
				name: "phone",
				type: "string",
			},
		] as Rows[],
		href: "/dashboard/customers",
	},
	{
		name: "Reviews",
		collection: "reviews",
		page: "collection",
		icon: <Star size={iconsSize} />,
		rows: [
			{
				name: "product",
				type: "string",
			},
			{
				name: "customer",
				type: "string",
			},
			{
				name: "rating",
				type: "number",
			},
			{
				name: "comment",
				type: "string",
			},
			{
				name: "date",
				type: "date",
			},
		] as Rows[],
		href: "/dashboard/reviews",
	},
	{
		name: "Sales",
		collection: "sales",
		icon: <DollarSign size={iconsSize} />,
		page: "collection",
		rows: [
			{
				name: "orderNumber",
				type: "string",
			},
			{
				name: "date",
				type: "date",
			},
			{
				name: "customer",
				type: "string",
			},
			{
				name: "products",
				type: "array",
			},
			{
				name: "totalAmount",
				type: "number",
			},
			{
				name: "status",
				type: "select",
				select: [
					{
						name: "Pending",
						value: "pending",
					},
					{
						name: "Completed",
						value: "completed",
					},
					{
						name: "Canceled",
						value: "canceled",
					},
				],
			},
		] as Rows[],
		href: "/dashboard/sales",
	},
	{
		name: "Categories",
		collection: "categories",
		icon: <Group size={iconsSize} />,
		page: "collection",
		rows: [
			{
				name: "image",
				type: "image",
			},
			{
				name: "name",
				type: "string",
			},
			{
				name: "description",
				type: "string",
			},
			{
				name: "parentCategory",
				type: "string",
			},
		] as Rows[],
		href: "/dashboard/categories",
	},
];
