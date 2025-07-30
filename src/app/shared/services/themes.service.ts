import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAdapter as http } from '../../core/adapters/http/http.adapter';
import { StorageService } from '../../core/services/storage.service';

export interface Theme {
    titles: {
        iso_locale: string;
        title: string;
    }[];
    id: string;
    created_at: string;
    locales: string[];
    templates_count: number;
    formats_count: number;
    is_featured: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ThemesService {

    private apiUrl = environment.designApiUrl;
    private accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50X3Byb2ZpbGUiOnsicHJvZHVjdCI6eyJpZCI6ImZidlpuZ2NCYmFGWmVVSzhoMGlsIn0sImN1cnJlbnRfbG9jYWxlIjoicHQtQlIifSwicHJvZmlsZXMiOlt7InByb2R1Y3QiOnsiaWQiOiJkY3V0dzFhZlY0Q0ZBQVduVUgzbiJ9fSx7InByb2R1Y3QiOnsiaWQiOiJmYnZabmdjQmJhRlplVUs4aDBpbCJ9fV0sInN1YiI6IkFrcHZDdXhYR01mM25wWVhhanlFWjhBMkFQbjIiLCJyb2xlIjoiZ2xvYmFsIiwiY29udGV4dCI6InRyYWt0by5pbyIsImlhdCI6MTc1Mzg0MDMxMywiZXhwIjoxNzU0MDEzMTEzfQ.ITrk0Pk7cxgXs_q6_kym4Hv5o-j4Bc0WHbDHHaJfrJU`;

    constructor(private storageService: StorageService) { }

    async getThemes(query: string = ''): Promise<any> {
        const url = `${this.apiUrl}/themes?${query}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            }
        }
        try {
            const response = await http.get(url, config);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateUserLanguage(language: string): Promise<any> {
        
        const url = `${this.apiUrl}/whitelabel/user/lang`;

        try {
            const response = await http.put(
                url, 
                {
                    lang: language
                }, 
                {
                    headers: {
                        'Authorization': `Bearer ${this.storageService.getItem<string>('accessToken')}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
} 