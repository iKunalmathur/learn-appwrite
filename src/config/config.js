/* eslint-disable no-undef */
const config = {
  appWrite: {
    api: String(import.meta.env.VITE_AW_API_URL),
    projectId: String(import.meta.env.VITE_AW_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_AW_DATABASE_ID),
    collectionID: String(import.meta.env.VITE_AW_COLLECTION_ID),
    bucketID: String(import.meta.env.VITE_AW_STORAGE_BUCKET_ID)
  },
  tinyApiKey: String(import.meta.env.VITE_TINY_API_KEY)
}

export default config
