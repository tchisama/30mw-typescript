import { CollPage, CustomPage, Rows, collType } from "@/types";
import { Value } from "@radix-ui/react-select";
import {
	AlertCircle,
	Book,
	Box,
	Boxes,
	Clipboard,
	DollarSign,
	Folder,
	Group,
	Home,
	List,
	Palette,
	Percent,
	Settings,
	SquareUserRound,
	Star,
	Users,
	XCircle,
} from "lucide-react";

// const iconsSize = 20;
// const strokeWidth = 2;
// const blogPage: CollPage = {
//     name: "Blog",
//     page: "collection",
//     icon: (props) => <Book {...props} />,
//     collection: "blog_posts",
//     href: "/dashboard/blog",
//     rows: [
//         {
//             name: "cover image",
//             type: "image"
//         },
//         {
//             name: "title",
//             type: "string"
//         },
//         {
//             name: "created at",
//             type: "date"
//         },
//         {
//             name: "updated at time",
//             type: "time"
//         },
//         {
//             name: "name",
//             type: "reference",
//             reference: {
//                 collection: "authors",
//                 key: "name"
//             }
//         },
//         {
//             name: "author",
//             type: "object",
//             object: [
//                 {
//                     name: "name",
//                     type: "reference",
//                     reference: {
//                         collection: "authors",
//                         key: "name"
//                     }
//                 },
//                 {
//                     name: "avatar",
//                     type: "reference",
//                     reference: {
//                         collection: "authors",
//                         key: "photo"
//                     }
//                 },
//                 {
//                     name: "role",
//                     type: "select",
//                     select: [
//                         {
//                             name: "admin",
//                             value: "admin"
//                         },
//                         {
//                             name: "author",
//                             value: "author"
//                         }
//                     ]
//                 }
//             ]
//         }, 
//         {
//             name: "content",
//             type: "text"
//         },
//         {
//             name: "publishedAt",
//             type: "date"
//         },
//         {
//             name: "tags",
//             type: "array",
//             array: [
//                 {
//                     name: "tag",
//                     type: "string"
//                 }
//             ]
//         }
//     ]
// };
// const productPage: CollPage = {
//     name: "Products",
//     page: "collection",
//     icon: (p) => <Boxes {...p}  />,
//     collection: "products",
//     href: "/dashboard/products",
//     rows: [
//         {
//             name: "name",
//             type: "string"
//         },
//         {
//             name: "description",
//             type: "text"
//         },
//         {
//             name:"colors",
//             type: "array",
//             array: [
//                 {
//                     name: "color",
//                     type: "object",
//                     object: [
//                         {
//                             name: "name",
//                             type: "string"
//                         },
//                         {
//                             name: "value",
//                             type: "object",
//                             object: [
//                                 {
//                                     name: "r",
//                                     type: "number"
//                                 },
//                                 {
//                                     name: "g",
//                                     type: "number"
//                                 },
//                                 {
//                                     name: "b",
//                                     type: "number"
//                                 },
//                                 {
//                                     name: "a",
//                                     type: "number"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//        },
//         {
//             name: "price",
//             type: "number",
//             prefix: "Dh"
//         },
//         {
//             name: "affiliateLink",
//             type: "string",
//         },
//         {
//             name: "category",
//             type: "reference",
//             reference: {
//                 collection: "categories",
//                 key: "name"
//             }
//         }
//     ]
// };
// const authorPage: CollPage = {
//     name: "Authors",
//     page: "collection",
//     icon: (p) => <SquareUserRound {...p} />,
//     collection: "authors",
//     href: "/dashboard/authors",
//     rows: [
//         {
//             name: "photo",
//             type: "avatar"
//         },
//         {
//             name: "name",
//             type: "string"
//         },
//         {
//             name: "description",
//             type: "text"
//         }
//     ]
// }
// const categoryPage: CollPage = {
//     name: "Categories",
//     page: "collection",
//     icon: (p)=><Folder {...p} />,
//     collection: "categories",
//     href: "/dashboard/categories",
//     rows: [
//         {
//             name: "name",
//             type: "string"
//         },
//         {
//             name: "description",
//             type: "text"
//         }
//     ]
// };

// export const collections: (CustomPage | CollPage)[] = [
//     blogPage,
//     productPage,
//     categoryPage,
//     authorPage
// ];