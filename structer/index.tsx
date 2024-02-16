import { CollPage, CustomPage, Rows, collType } from "@/types";
import { Value } from "@radix-ui/react-select";
import {
	AlertCircle,
	Box,
	Boxes,
	Clipboard,
	DollarSign,
	Group,
	Home,
	List,
	Palette,
	Percent,
	Settings,
	Star,
	Users,
	XCircle,
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
				name:"image",
				type:"image"
			},
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
				select:
					new Array(5).fill(0).map((_, i) => ({ name: (i + 1)+ " " + new Array(i + 1).fill("⭐").join(""), value: i + 1 })),
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
			{
				name:"infos",
				type:"object",
				object:[
					{
						name:"description",
						type:"text"
					},
					{
						name:"colors",
						type:"array",
						array:[
							{
								name:"color",
								type:"string"
							},
							{
								name:"my colors",	
								type:"array",
								array:[
									{
										name:"color",
										type:"string"
									}
								]

							}
						]
					}
				]
			}
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





const orderPage: CollPage = {
    name: "Orders",
    page: "collection",
    icon: <DollarSign size={iconsSize} strokeWidth={strokeWidth} />,
    collection: "orders",
    href: "/dashboard/orders",
    rows: [
        {
            name: "orderID",
            type: "string"
        },
        {
            name: "customer",
            type: "reference",
            reference: {
                collection: "customers",
                key: "name"
            }
        },
        {
            name: "totalAmount",
            type: "number",
            prefix: "Dh"
        },
        {
            name: "status",
            type: "select",
            select: [
                { name: "Pending ⌛", value: "pending" },
                { name: "Processing 🚚", value: "processing" },
                { name: "Completed ✅", value: "completed" },
                { name: "Cancelled ❌", value: "cancelled" }
            ]
        },
        {
            name: "date",
            type: "date"
        }
    ]
};

const customerPage: CollPage = {
    name: "Customers",
    page: "collection",
    icon: <Users size={iconsSize} strokeWidth={strokeWidth} />,
    collection: "customers",
    href: "/dashboard/customers",
    rows: [
        {
            name: "name",
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
            name: "totalOrders",
            type: "number"
        }
    ]
};
const inventoryPage: CustomPage = {
    name: "Inventory",
    icon: <Clipboard size={iconsSize} strokeWidth={strokeWidth} />,
    href: "/dashboard/inventory",
    page: "custom",
    sections: [
        {
            type: "analyticsCards",
            name: "Inventory Overview",
            cards: [
                {
                    name: "Total Products",
                    subtitle: "Total number of products in inventory",
                    collection: "products",
                    icon: <Boxes size={50} strokeWidth={1} />,
                },
                {
                    name: "Out of Stock",
                    subtitle: "Products currently out of stock",
                    collection: "products",
                    icon: <XCircle size={50} strokeWidth={1} />,
                },
                {
                    name: "Expiring Soon",
                    subtitle: "Products expiring within the next month",
                    collection: "products",
                    icon: <AlertCircle size={50} strokeWidth={1} />,
                },
            ],
        },
    ],
};
const brandPage: CollPage = {
    name: "Brands",
    page: "collection",
    icon: <Palette size={iconsSize} strokeWidth={strokeWidth} />,
    collection: "brands",
    href: "/dashboard/brands",
    rows: [
        {
            name: "name",
            type: "string"
        },
        {
            name: "logo",
            type: "image"
        },
        {
            name: "description",
            type: "text"
        }
    ]
};

const discountPage: CollPage = {
    name: "Discounts",
    page: "collection",
    icon: <Percent size={iconsSize} strokeWidth={strokeWidth} />,
    collection: "discounts",
    href: "/dashboard/discounts",
    rows: [
        {
            name: "code",
            type: "string"
        },
        {
            name: "percentage",
            type: "number",
            prefix: "%"
        },
        {
            name: "expiryDate",
            type: "date"
        }
    ]
};

const reviewPage: CollPage = {
    name: "Reviews",
    page: "collection",
    icon: <Star size={iconsSize} strokeWidth={strokeWidth} />,
    collection: "reviews",
    href: "/dashboard/reviews",
    rows: [
        {
            name: "product",
            type: "reference",
            reference: {
                collection: "products",
                key: "name"
            }
        },
        {
            name: "rating",
            type: "select",
            select: new Array(5).fill(0).map((_, i) => ({ name: (i + 1)+ " " + new Array(i + 1).fill("⭐").join(""), value: i + 1 })),

        },
        {
            name: "comment",
            type: "text"
        }
    ]
};

export const collections: collType[] = [
    homePage,
    productPage,
    categoryPage,
    orderPage,
		customerPage,
		inventoryPage,
		brandPage,
		discountPage,
		reviewPage
];
