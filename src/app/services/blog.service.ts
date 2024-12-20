import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, BlogResponse } from '../interfaces/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl =
    'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io';

  constructor(private http: HttpClient) {}

  // Abrufen der Blog-Übersicht
  getBlogs(): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}/entries`);
  }

  // Abrufen der Blog-Details
  getBlogDetails(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/entries/${id}`);
  }

  // Kommentar hinzufügen
  addComment(
    id: number,
    comment: { text: string },
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/entries/${id}/comments`,
      comment,
    );
  }

  // Like-Informationen aktualisieren
  updateLikeInfo(
    id: number,
    likeInfo: { likedByMe: boolean },
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/entries/${id}/like-info`,
      likeInfo,
    );
  }

  // Neuen Blog-Eintrag erstellen
  createBlogEntry(blogData: {
    title: string;
    content: string;
  }): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiUrl}/entries`, blogData);
  }

  // Blog-Eintrag löschen
  deleteBlogEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/entries/${id}`);
  }

  // Blog-Eintrag aktualisieren
  updateBlogEntry(
    id: number,
    updateData: { title?: string; content?: string },
  ): Observable<Blog> {
    return this.http.patch<Blog>(`${this.apiUrl}/entries/${id}`, updateData);
  }

  // Prüfen, ob ein Titel bereits existiert
  checkTitleExists(title: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/entries/title-exists?title=${title}`,
    );
  }
}
