import { FieldCollection } from "../types"
import CryptoJS from "crypto-js"

export const news: FieldCollection = {
	label: "News",
	name: "news",
	path: "content/news",
	format: "mdx",
	ui: {
		router: ({ document }) => {
			return `/news/${document._sys.filename}`
		},
		filename: {
			slugify: values => {
				if (values?.title) {
					const cryptValue = CryptoJS.HmacSHA1(
						values.title,
						"I love cupcakes"
					).toString()
					return cryptValue
				}
				return `${values?.topic || "no-topic"}-${values?.title
					?.toLowerCase()
					.replace(/ /g, "-")}`
			},
		},
	},
	defaultItem: {
		pubDate: new Date(),
		hideNews: false,
	},
	fields: [
		{
			type: "string",
			label: "Title",
			name: "title",
			isTitle: true,
			required: true,
		},
		{
			type: "rich-text",
			label: "Description",
			name: "description",
			isBody: true,
		},
		{
			type: "image",
			label: "Preview Image",
			name: "image",
		},
		{
			list: true,
			type: "object",
			name: "templates",
			label: "Categories",
			ui: {
				visualSelector: true,
			},
			templates: [
				{
					name: "category",
					label: "Category",
					ui: {
						itemProps: item => {
							if (item.category) {
								const category = item.category
									.split("/")
									.slice(-1)[0]
									.split(".")[0]
								return { label: category }
							}
							return { label: "No category" }
						},
					},
					fields: [
						{
							type: "reference",
							label: "Category",
							name: "category",
							collections: ["newsCategories"],
						},
					],
				},
			],
		},
		{
			type: "datetime",
			label: "Published date",
			name: "pubDate",
			ui: {
				timeFormat: "MM.DD.YYYY HH:mm",
			},
		},
		{
			type: "boolean",
			label: "Hide",
			name: "hideNews",
		},
	],
}
