import axios from "axios";
import { API_URL } from "@/env";
import type { Search, SearchCommand } from '@/services/search/search.model'

export class SearchService {
    public static searchApiUrl = `${API_URL}/api/search`
    static async all(): Promise<{data: Search[] | never[]}> {
        return await axios.get(this.searchApiUrl)
    }

    static async create(search: SearchCommand): Promise<{data: Search}> {
        return await axios.post(this.searchApiUrl, search)
    }

    static async delete(id: number): Promise<null> {
        return await axios.delete(this.searchApiUrl + id)
    }
}
