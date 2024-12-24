import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'src/configuration/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  async get(endpoint: string, api_version:string = ''): Promise<any> {
    const headers = await this.getAuthHeaders();

    if(api_version === ''){
      return this.http.get(`${CONFIG.server}/${endpoint}`, { headers });
    }else{
      return this.http.get(`${CONFIG.server}/${api_version}/${endpoint}`, { headers });
    }

  }

  async post(endpoint: string, data: any, api_version:string = ''): Promise<any> {
    const headers = await this.getAuthHeaders();

    if(api_version === ''){
      return this.http.post(`${CONFIG.server}/${endpoint}`, data, { headers });
    }else{
      return this.http.post(`${CONFIG.server}/${api_version}/${endpoint}`, data, { headers });
    }

  }

  private async getAuthHeaders(): Promise<HttpHeaders> {
    const token = await this.authService.getToken();
    return token
      ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      : new HttpHeaders();
  }
}
