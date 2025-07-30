import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpAdapter as http } from '../../core/adapters/http/http.adapter';
import { StorageService } from '../../core/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private apiUrl = environment.apiUrl;

    constructor(private storageService: StorageService) { }

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