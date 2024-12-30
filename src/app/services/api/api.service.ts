import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthData } from 'src/app/models/auth/auth-data';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  async get(endpoint: string, api_version:string = ''): Promise<any> {
    const headers = await this.getAuthHeaders();

    if(api_version === ''){
      return this.http.get(`${URL}${endpoint}`, { headers });
    }else{
      return this.http.get(`${URL}${api_version}/${endpoint}`, { headers });
    }

  }

  async post(endpoint: string, data: any, api_version:string = ''): Promise<any> {
    const headers = await this.getAuthHeaders();

    if(api_version === ''){
      return this.http.post(`${URL}${endpoint}`, data, { headers });
    }else{
      return this.http.post(`${URL}${api_version}/${endpoint}`, data, { headers });
    }

  }

  autheticate(data: AuthData){
    this.authenticate('login',data).then(
      value => console.log( value )
    );
  }

  async authenticate(endpoint: string, data: any, api_version: string = ''): Promise<any> {
    try {
      if (api_version === '') {
        const resp = await this.http.post(`${URL}${endpoint}`, data).toPromise();
        console.log(resp);
        return resp;
      } else {
        return await this.http.post(`${URL}${api_version}/${endpoint}`, data).toPromise();
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      if (error instanceof HttpErrorResponse) {
        console.error('HTTP Error:', error.message, error.status, error.statusText, error.url);
      }
      throw error;
    }
  }

  private async getAuthHeaders(): Promise<HttpHeaders> {
    const token = await this.authService.getToken();
    return token
      ? new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      : new HttpHeaders();
  }
}
