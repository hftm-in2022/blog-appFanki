import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogResponse } from '../interfaces/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl =
    'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io/';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/entries`);
  }
}
