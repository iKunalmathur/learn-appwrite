/* eslint-disable no-useless-catch */

import { Client, Account, ID } from 'appwrite'
import config from '../config/config'

class AuthService {
  client = null
  account = null
  constructor() {
    this.client = new Client()
      .setEndpoint(config.appWrite.api)
      .setProject(config.appWrite.projectId)

    this.account = new Account(this.client)
  }

  // create account
  async createAccount({ email, password, name }) {
    try {
      const account = await this.account.create(ID.unique(), email, password, name)

      if (!account) {
        return account
      }

      return this.login({ email, password })
    } catch (error) {
      throw error
    }
  }

  //login user
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      console.error('authService > login > ', error)
      return false
    }
  }

  // logout user
  async logout() {
    try {
      await this.account.deleteSession('current')
    } catch (error) {
      console.error('authService > logout > ', error)
      return false
    }
  }

  //getCurrentUser
  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      console.error('authService > getCurrentUser > ', error)
      return false
    }
  }
}

export default new AuthService()
