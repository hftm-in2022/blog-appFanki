import { Injectable, signal, WritableSignal } from '@angular/core';
import { Blog } from '../interfaces/blog';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Definition von ReadonlySignal als Interface
// Funktion, die den aktuellen Wert zurückgibt
export type ReadonlySignal<T> = () => T;

@Injectable({
  providedIn: 'root', // Globale Bereitstellung
})
export class StateStore {
  // Zentrales Signal für Blogs
  private blogsSignal: WritableSignal<Blog[]> = signal([]);

  // RxJS Subject für asynchrone Effekte und Actions
  private actions$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.fetchBlogs(); // Blogs direkt beim Initialisieren laden
    this.observeActions(); // Aktionen automatisch überwachen
  }

  // Getter für Blogs
  get blogs(): ReadonlySignal<Blog[]> {
    return this.blogsSignal as ReadonlySignal<Blog[]>; // Typanpassung
  }

  // Aktionen
  loadBlogs(blogList: Blog[]): void {
    console.log('Loading blogs...');
    this.blogsSignal.set(blogList);
    this.dispatchAction('LOAD_BLOGS');
  }

  addBlog(newBlog: Blog): void {
    console.log('Adding a new blog...');
    this.blogsSignal.update((blogs) => [...blogs, newBlog]);
    this.dispatchAction('ADD_BLOG');
  }

  deleteBlog(blogId: number): void {
    console.log(`Deleting blog with ID: ${blogId}`);
    this.blogsSignal.update((blogs) =>
      blogs.filter((blog) => blog.id !== blogId),
    );
    this.dispatchAction('DELETE_BLOG');
  }

  // Effekt: Beobachten von Aktionen
  private observeActions(): void {
    this.actions$.subscribe((action) => {
      console.log('Action observed:', action);
      // Füge hier komplexere Logiken oder Side-Effects ein, falls erforderlich
    });
  }

  // Action Dispatch
  dispatchAction(action: string): void {
    this.actions$.next(action);
  }

  // Observable für Actions (für externe Nutzung, falls erforderlich)
  getActions(): Observable<string> {
    return this.actions$.asObservable();
  }

  // Blogs asynchron vom Backend laden
  fetchBlogs(): void {
    console.log('Fetching blogs...');
    this.http
      .get<
        Blog[]
      >('https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io')
      .subscribe(
        (blogs) => {
          console.log('Blogs fetched:', blogs);
          this.blogsSignal.set(blogs);
          this.dispatchAction('FETCH_BLOGS_SUCCESS');
        },
        (error) => {
          console.error('Failed to fetch blogs:', error);
          this.dispatchAction('FETCH_BLOGS_FAILURE');
        },
      );
  }
}
