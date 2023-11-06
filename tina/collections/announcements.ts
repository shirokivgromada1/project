import { FieldCollection } from "../types"
import CryptoJS from "crypto-js"

export const announcements: FieldCollection = {
	label: "Announcements",
	name: "announcements",
	path: "content/announcements",
	format: "mdx",
	ui: {
		router: ({ document }) => {
			return `/announcements/${document._sys.filename}`
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
		hideAnn: false,
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
			required: true,
		},
		{
			type: "image",
			label: "Preview Image",
			name: "image",
			required: true,
		},
		{
			type: "datetime",
			label: "Published",
			name: "pubDate",
			required: true,
			ui: {
				timeFormat: "MM.DD.YYYY HH:mm",
			},
		},
		{
			type: "boolean",
			label: "Hide",
			name: "hideAnn",
		},
	],
}
