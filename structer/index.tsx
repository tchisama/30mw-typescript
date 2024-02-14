import { Rows } from "@/types";
import { Box, Boxes, DollarSign, Group, List, Star, Users } from "lucide-react";

const iconsSize = 18
export const collections = [
	{
		name: "Products",
		collection: "products",
    type: "table",
		icon: <Box size={iconsSize}/>,
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
        name: "price",
        type: "number"
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
        type: "number"
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
		icon: <Boxes size={iconsSize}/>,
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
      },
      {
        name: "orders",
        type: "array"
      }
    ] as Rows[],
    href: "/dashboard/customers"
  },
  {
    name: "Reviews",
    collection: "reviews",
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