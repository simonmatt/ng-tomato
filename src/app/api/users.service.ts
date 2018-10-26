import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const NODE_API_BASE_URL = environment.node_api_base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  signInOrUp(username: string, password: string, type: string) {
    return this.http.post(`${NODE_API_BASE_URL}/auth/users`, {
      username,
      password,
      type
    });
  }

  fetchSignedUser(headers:any) {
    return this.http.get(`${NODE_API_BASE_URL}/auth/user`, {
      headers: headers
    });
  }

  fetchUserById(id) {
    return this.http.get(`${NODE_API_BASE_URL}/auth/users/${id}`);
  }
}
