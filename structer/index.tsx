import { Rows, collType } from "@/types";
import { Box, Boxes, DollarSign, Group, Home, List, Star, Users } from "lucide-react";

const iconsSize = 18
export const collections: collType[] = [
  {
    name:"Home",
    icon:<Home size={iconsSize}/>,
    href:"/dashboard/home",
    page:"custom",
    sections:[
        {
          type:"analyticsCards",
          name:"Analytics",
          cards:[
            {
              name:"Products",
              subtitle:"number of all the products in the store",
              collection:"products",
              icon:<Boxes size={50} strokeWidth={1}/>
            },
            {
              name:"orders",
              subtitle:"number of all the orders you got",
              collection:"orders",
              icon:<DollarSign size={50} strokeWidth={1}/>
            }
          ]
        }
      ]
  },
	{
		name: "Products",
    page:"collection",
		collection: "products",
		icon: <Box size={iconsSize}/>,
    type: "table",
		rows: [
      {
        name: "image",
        type: "image"
      },
      {
        name: "name",
        type: "string"
      },
      {
        name: "description",
        type: "text"
      },
      {
        name: "price",
        type: "number",
        prefix:"Dh"
      },
      {
        name: "category",
        type: "select",
        select: [
          {
            name: "Electronics",
            value: "electronics"
          },
          {
            name: "Clothing",
            value: "clothing"
          },
          // Add more categories as needed
        ]
      },
      {
        name: "stock",
        type: "number",
        prefix:"items"
      },
      {
        name: "featured",
        type: "boolean"
      },
    ] as Rows[],
    href: "/dashboard/products"
	},
	{
		name: "Orders",
		collection: "orders",
    page:"collection",
		icon: <Boxes size={iconsSize}/>,
    type: "table",
		rows: [
      {
        name: "orderNumber",
        type: "string"
      },
      {
        name: "date",
        type: "date"
      },
      {
        name: "customer",
        type: "string"
      },
      {
        name: "totalAmount",
        type: "number"
      },
      {
        name: "status",
        type: "select",
        select: [
          {
            name: "Pending",
            value: "pending"
          },
          {
            name: "Shipped",
            value: "shipped"
          },
          {
            name: "Delivered",
            value: "delivered"
          },
          // Add more status options as needed
        ]
      },
    ] as Rows[],
    href: "/dashboard/orders"
	},
{
    name: "Customers",
    collection: "customers",
    page:"collection",
    icon: <Users size={iconsSize}/>,
    rows: [
      {
        name: "firstName",
        type: "string"
      },
      {
        name: "lastName",
        type: "string"
      },
      {
        name: "email",
        type: "string"
      },
      {
        name: "phone",
        type: "string"
      },
      {
        name: "address",
        type: "string"
      }
    ] as Rows[],
    href: "/dashboard/customers"
  },
  {
    name: "Reviews",
    collection: "reviews",
    page:"collection",
    icon: <Star size={iconsSize}/>,
    rows: [
      {
        name: "product",
        type: "string"
      },
      {
        name: "customer",
        type: "string"
      },
      {
        name: "rating",
        type: "number"
      },
      {
        name: "comment",
        type: "string"
      },
      {
        name: "date",
        type: "date"
      }
    ] as Rows[],
    href: "/dashboard/reviews"
  },
  {
    name: "Sales",
    collection: "sales",
    icon: <DollarSign size={iconsSize}/>,
    page:"collection",
    rows: [
      {
        name: "orderNumber",
        type: "string"
      },
      {
        name: "date",
        type: "date"
      },
      {
        name: "customer",
        type: "string"
      },
      {
        name: "products",
        type: "array"
      },
      {
        name: "totalAmount",
        type: "number"
      },
      {
        name: "status",
        type: "select",
        select: [
          {
            name: "Pending",
            value: "pending"
          },
          {
            name: "Completed",
            value: "completed"
          },
          {
            name: "Canceled",
            value: "canceled"
          }
        ]
      }
    ] as Rows[],
    href: "/dashboard/sales"
  },
  {
    name: "Categories",
    collection: "categories",
    icon: <Group size={iconsSize}/>,
    page:"collection",
    rows: [
      {
        name: "name",
        type: "string"
      },
      {
        name: "description",
        type: "string"
      },
      {
        name: "parentCategory",
        type: "string"
      },
      {
        name: "image",
        type: "string"
      }
    ] as Rows[],
    href: "/dashboard/categories"
  }
];