import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';

// Blog Interface
export interface Blog {
  id: number;
  title: string;
  contentPreview: string;
  author: string;
  likes: number;
  comments: number;
  likedByMe: boolean;
  createdByMe: boolean;
  headerImageUrl?: string; // optional
}

// Entries Interface
export interface Entries {
  data: Blog[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
}

// Comment Interface
export interface Comment {
  id: number;
  content: string;
  author: string;
  updatedAt: string;
  createdAt: string;
}

// BlogDetails Interface
export interface BlogDetails extends Blog {
  updatedAt: string;
  createdAt: string;
  content: string;
  comments: number;
}

@Injectable({
  providedIn: 'root',
})
export class BlogBackendService {
  httpClient = inject(HttpClient);
  private oidcSecurityService = inject(OidcSecurityService);

  getBlogPosts(): Observable<Entries> {
    return this.httpClient.get<Entries>(`${environment.serviceUrl}/entries`);
  }

  getBlogById(id: number): Observable<BlogDetails> {
    return this.httpClient.get<BlogDetails>(
      `${environment.serviceUrl}/entries/${id}`,
    );
  }

  checkTitleExists(title: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      `${environment.serviceUrl}/check-title?title=${title}`,
    );
  }

  addBlog(blog: { title: string; content: string }): Observable<Blog> {
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.httpClient.post<Blog>(
          `${environment.serviceUrl}/entries`,
          blog,
          { headers },
        );
      }),
    );
  }
}
