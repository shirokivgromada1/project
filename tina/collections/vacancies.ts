import { FieldCollection } from "../types"
import CryptoJS from "crypto-js"

export const vacancies: FieldCollection = {
	label: "Vacancies",
	name: "vacancies",
	path: "content/vacancies",
	format: "mdx",
	ui: {
		router: ({ document }) => {
			return `/vacancies/${document._sys.filename}`
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
		hideVac: false,
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
			type: "rich-text",
			label: "Announce title",
			name: "announceTitle",
		},
		{
			type: "rich-text",
			label: "Description",
			name: "description",
			isBody: true,
		},
		{
			type: "rich-text",
			label: "Contacts information",
			name: "contactsInfo",
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
			name: "hideVac",
		},
	],
}
