/* eslint-disable no-undef */

const config = {
  appWrite: {
    api: String(process.env.REACT_AW_API_URL),
    projectId: String(process.env.REACT_AW_PROJECT_ID),
    databaseId: String(process.env.REACT_AW_DATABASE_ID),
    collectionID: String(process.env.REACT_AW_COLLECTION_ID),
    bucketID: String(process.env.REACT_AW_STORAGE_BUCKET_ID),
  },
};

export default config;
