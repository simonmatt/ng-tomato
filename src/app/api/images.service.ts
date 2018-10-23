import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const NODE_API_BASE_URL = environment.node_api_base_url;
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  fetchImages(count) {
    return this.http.get(`${NODE_API_BASE_URL}/api/images?count=${count}`);
  }

  fetchImageById(id){
    return this.http.get(`${NODE_API_BASE_URL}/api/images/${id}`);
  }
}
