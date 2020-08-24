import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const NODE_API_BASE_URL = environment.node_api_base_url;

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  constructor(private http: HttpClient) {

  }

  fetchVideos(p?: any) {
    if (!p) {
      return this.http.get(`${NODE_API_BASE_URL}/api/videos`);
    } else {
      return this.http.get(`${NODE_API_BASE_URL}/api/videos?p=${p}`);
    }
  }

  fetchVideoById(id) {
    return this.http.get(`${NODE_API_BASE_URL}/api/videos/${id}`);
  }

  postVideo(postData) {
    return this.http.post(`${NODE_API_BASE_URL}/api/videos`, postData);
  }

  fetchVideoByUserId(userId) {
    return this.http.get(`${NODE_API_BASE_URL}/api/uservideos?userId=${userId}`);
  }

  deleteVideoById(id) {
    return this.http.delete(`${NODE_API_BASE_URL}/api/videos/${id}`);
  }
}
