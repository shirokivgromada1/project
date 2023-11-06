import { TinaCMS, defineConfig } from "tinacms"
import {
	roles,
	departmentPeople,
	newsCategories,
	news,
	announcements,
	global,
	pages,
	vacancies,
} from "./index"
import { Collection } from "./__generated__/types"
import { newspapers } from "./collections/newspapers"

const config = defineConfig({
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
	branch:
		process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
		process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
		process.env.HEAD!, // Netlify branch env
	token: process.env.TINA_TOKEN!,
	media: {
		// If you wanted cloudinary do this
		// loadCustomStore: async () => {
		//   const pack = await import("next-tinacms-cloudinary");
		//   return pack.TinaCloudCloudinaryMediaStore;
		// },
		// this is the config for the tina cloud media store
		tina: {
			publicFolder: "public",
			mediaRoot: "uploads",
		},
	},
	build: {
		publicFolder: "public",
		outputFolder: "admin",
	},
	schema: {
		collections: [
			roles,
			departmentPeople,
			newsCategories,
			news,
			announcements,
			vacancies,
			newspapers,
			global,
			pages,
		],
	},
})

export default config
