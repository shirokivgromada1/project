import { FieldCollection } from "../types"
import CryptoJS from "crypto-js"

export const newspapers: FieldCollection = {
	label: "Newspapers",
	name: "newspapers",
	path: "content/newspapers",
	format: "mdx",
	ui: {
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
		hidePaper: false,
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
			type: "image",
			label: "Preview Image",
			name: "image",
		},
		{
			type: "image",
			label: "PDF file",
			name: "pdf",
		},
		{
			type: "datetime",
			label: "Published date",
			name: "pubDate",
			ui: {
				timeFormat: "MM.DD.YYYY",
			},
		},
		{
			type: "boolean",
			label: "Hide",
			name: "hidePaper",
		},
	],
}
