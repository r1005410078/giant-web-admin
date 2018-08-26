import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { article_list_api, article_detail_api, article_update_api } from './api';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  constructor(public http: HttpClient) { }

  getArticleList({page = 1, page_size = 99}) {
    return this.http.post(article_list_api, {page, page_size});
  }

  getArticleDetail({id}) {
    return this.http.post(article_detail_api, {id});
  }

  updateArticle({content, cover_img, id, route, status, title, type}) {
    return this.http.post(article_update_api, {content, cover_img, id, route, status, title, type});
  }
}
