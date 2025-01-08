import { Injectable, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthData } from 'src/app/models/auth/auth-data';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  async get(endpoint: string, api_version: string = '', param: Array<any> = []): Promise<any> {
    const headers = await this.getAuthHeaders();
  
    let params = new HttpParams();
  
    if (param && param.length > 0) {
      param.forEach(p => {
        params = params.append(p.key, p.value);
      });
    }
  
    // Construir la URL base
    const url = api_version === '' ? `${URL}${endpoint}` : `${URL}${api_version}${endpoint}`;
  
    // Realizar la solicitud GET
    const resp = await this.http.get(url, { headers, params }).toPromise();
    return resp;
  }

  async post(endpoint: string, data: any, api_version:string = ''): Promise<any> {
    const headers = await this.getAuthHeaders();

    if(api_version === ''){
      return this.http.post(`${URL}${endpoint}`, data, { headers });
    }else{
      return this.http.post(`${URL}${api_version}${endpoint}`, data, { headers });
    }

  }

  autheticate(data: AuthData): Promise<any>{
    return this.authenticate('login',data);
  }

  async authenticate(endpoint: string, data: any, api_version: string = ''): Promise<any> {
    try {
      if (api_version === '') {
        const resp = await this.http.post(`${URL}${endpoint}`, data).toPromise();
        return resp;
      } else {
        return await this.http.post(`${URL}${api_version}/${endpoint}`, data).toPromise();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async getAuthHeaders(): Promise<HttpHeaders> {
    const jwtData = await this.authService.getJwtData();
    return jwtData
      ? new HttpHeaders({ 'Authorization': `Bearer ${jwtData.token}` })
      : new HttpHeaders();
  }
}
