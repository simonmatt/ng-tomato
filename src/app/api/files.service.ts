import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const NODE_API_BASE_URL = environment.node_api_base_url;

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http:HttpClient) { }

  uploadFile(file){
    return this.http.post(`${NODE_API_BASE_URL}/api/upload`,file);
  }
}
