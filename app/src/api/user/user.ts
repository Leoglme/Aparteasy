import axios from "axios";
import { API_URL } from "@/env";
import type { User as UserType } from '@/api/user/user.model'

export class User {
    static all(search: string): Promise<{data: {data: UserType[], total: number }}> {
        const url = `${API_URL}/users?search=${search}`
        return axios.get(url).then(response => response).catch(err => err)
    }

    static async findById(id: string | string[]): Promise<{data: UserType}> {
        return await axios.get(API_URL + '/user/' + id).then(response => response).catch(err => err)
    }

    static async update(id: string | string[], user: { email: string, name: string, city: string }): Promise<UserType> {
        return await axios.put(API_URL + '/user/' + id, user).then(response => response).catch(err => err)
    }

    static delete(id: number): Promise<null> {
        return axios.delete(API_URL + '/user/' + id).then(response => response).catch(err => err)
    }
}
