import { Client, ID, Storage } from 'appwrite'
import config from '../config/config'

class BucketService {
  client = null
  storage = null
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appWrite.api)
      .setProject(config.appWrite.projectId)

    this.storage = new Storage(this.client)
  }

  // uploadFile
  async uploadFile(file) {
    try {
      return await this.storage.createFile(config.appWrite.bucketID, ID.unique(), file)
    } catch (error) {
      console.error('bucketService > uploadFile > ', error)
      return false
    }
  }

  //deleteFile
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appWrite.bucketID, fileId)
    } catch (error) {
      console.error('bucketService > deleteFile > ', error)
      return false
    }
  }

  //getFilePreview
  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appWrite.bucketID, fileId).href
    } catch (error) {
      console.error('bucketService > getFilePreview > ', error)
      return false
    }
  }
}

export default new BucketService()
