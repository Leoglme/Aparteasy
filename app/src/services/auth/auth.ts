import { API_URL } from '@/env'
import axios from 'axios'
import type { SignupCommand } from '@/services/auth/auth.model'
import { notify } from '@/plugins/notyf'
import { useAuthStore } from '@/stores/auth.store'
import type { User } from '@/services/user/user.model'
import { useRouter } from 'vue-router'

export class AuthService {
  private authStore
  private headers
  private router

  constructor() {
    this.authStore = useAuthStore()
    this.router = useRouter()
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  async login(body: { email: string; password: string }): Promise<{ success: boolean }> {
    let success = false
    notify.dismissAll()
    await axios
      .post(API_URL + '/api/auth/login', JSON.stringify(body), {
        headers: this.headers
      })
      .then(async (response) => {
        await this.authStore.setToken(response.data.token.token)
        await this.authStore.setUser(response.data.user)
        success = true
      })
      .catch((err) => {
        console.log('err', err)
      })
    return { success }
  }

  async forgotPassword(email: string): Promise<{ success: boolean }> {
    let success = false
    notify.dismissAll()
    await axios
      .post(API_URL + '/api/auth/forgot-password', JSON.stringify({ email }), {
        headers: this.headers
      })
      .then(() => {
        success = true
      })
      .catch((err) => {
        console.log('err', err)
      })
    return { success }
  }

  async resetPassword(body: { password: string; token?: string }): Promise<{ success: boolean }> {
    let success = false
    notify.dismissAll()
    await axios
      .post(API_URL + '/api/auth/reset-password', JSON.stringify(body), {
        headers: this.headers
      })
      .then(() => {
        success = true
      })
      .catch((err) => {
        console.log('err', err)
      })
    return { success }
  }

  async signup(body: SignupCommand): Promise<{ success: boolean }> {
    let success = false
    notify.dismissAll()
    await axios
      .post(API_URL + '/api/auth/signup', JSON.stringify(body), {
        headers: this.headers
      })
      .then(async (response) => {
        await this.authStore.setToken(response.data.token.token)
        await this.authStore.setUser(response.data.user)
        success = true
      })
      .catch((err) => {
        console.log('err', err)
      })
    return { success }
  }

  static status(): Promise<{ data: { user: User } }> {
    return axios.get(API_URL + '/api/auth/status')
  }
}
