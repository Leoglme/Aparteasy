import axios from "axios";
import { API_URL } from "@/env";
import type { Search, SearchCommand, SearchInviteResponse } from '@/services/search/search.model'

export class SearchService {
    public static searchApiUrl = `${API_URL}/api/searches`
    public static searchInvitationApiUrl = `${API_URL}/api/search-invitations`
    static async all(): Promise<{data: Search[] | never[]}> {
        return await axios.get(this.searchApiUrl)
    }

    static async create(search: SearchCommand): Promise<{data: Search}> {
        return await axios.post(this.searchApiUrl, search)
    }

    static async delete(id: number): Promise<null> {
        const url = `${this.searchApiUrl}/${id}`
        return await axios.delete(url)
    }
    static async inviteUsers(searchId: number, emails: string[]): Promise<{ data: SearchInviteResponse[] }> {
        const url = `${this.searchInvitationApiUrl}/${searchId}/invite`
        return await axios.post(url, { emails })
    }
    static async acceptInvitation(token?: string): Promise<{ data: SearchInviteResponse }> {
        const url = `${this.searchInvitationApiUrl}/${token}/accept`
        return await axios.patch(url)
    }
    static async decodeInvitationToken(token?: string): Promise<{ data: { email: string, searchId: string, hasAccount: boolean } }> {
        const url = `${this.searchInvitationApiUrl}/decode-token?token=${token}`
        return await axios.get(url)
    }
}
