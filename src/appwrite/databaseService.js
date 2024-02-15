/* eslint-disable no-useless-catch */
import { Client, Databases, ID, Query } from 'appwrite'
import config from '../config/config'

class DatabaseService {
  client = null
  database = null

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appWrite.api)
      .setProject(config.appWrite.projectId)

    this.database = new Databases(this.client)
  }

  // getPosts
  async getPosts(queries = [Query.equal('status', 'published')]) {
    try {
      return await this.database.listDocuments(
        config.appWrite.databaseId,
        config.appWrite.collectionID,
        queries
      )
    } catch (error) {
      console.error('databaseService > getPosts > ', error)
      return false
    }
  }

  //getPost based on slug
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appWrite.databaseId,
        config.appWrite.collectionID,
        slug
      )
    } catch (error) {
      console.error('databaseService > getPost > ', error)
      return false
    }
  }

  //createPost
  async createPost({ title, slug, content, image, status, userId, is_published = true }) {
    try {
      return await this.database.createDocument(
        config.appWrite.databaseId,
        config.appWrite.collectionID,
        slug,
        {
          title,
          slug,
          content,
          image,
          status,
          userId,
          is_published
        }
      )
    } catch (error) {
      console.error('databaseService > createPost > ', error)
      return false
    }
  }

  //updatePost
  async updatePost({ title, slug, content, image, status, userId, is_published = true }) {
    try {
      return await this.database.updateDocument(
        config.appWrite.databaseId,
        config.appWrite.collectionID,
        slug,
        {
          title,
          slug,
          content,
          image,
          status,
          userId,
          is_published
        }
      )
    } catch (error) {
      console.error('databaseService > updatePost > ', error)
      return false
    }
  }

  //deletePost
  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        config.appWrite.databaseId,
        config.appWrite.collectionID,
        slug
      )
    } catch (error) {
      console.error('databaseService > deletePost > ', error)
      return false
    }
  }
}

export default new DatabaseService()
