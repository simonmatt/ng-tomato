import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const NODE_API_BASE_URL = environment.node_api_base_url;
@Injectable({
  providedIn: 'root'
})
export class TomatoService {

  constructor(private http: HttpClient) { }

  fetchCommentById(id) {
    return this.http.get(`${NODE_API_BASE_URL}/api/comments/${id}`);
  }

  fetchCommentByType(type, typeId) {
    return this.http.get(`${NODE_API_BASE_URL}/api/comments?type=${type}&typeId=${typeId}`)
  }

  postComment(commentInfo) {
    return this.http.post(`${NODE_API_BASE_URL}/api/comments`, commentInfo);
  }

  getRepoStar(user, repo) {
    return this.http.get(`https://api.github.com/repos/${user}/${repo}`);
  }
}
