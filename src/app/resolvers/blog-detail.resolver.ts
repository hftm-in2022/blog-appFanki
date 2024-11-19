import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { BlogService } from '../services/blog.service';

@Injectable({
  providedIn: 'root',
})
export class BlogDetailResolver implements Resolve<Blog | null> {
  constructor(private blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Blog | null> {
    // 'RouterStateSnapshot' entfernt
    const blogId = route.paramMap.get('id');
    if (blogId) {
      return this.blogService.getBlogDetails(+blogId); // + für Typumwandlung in eine Zahl
    }
    return of(null); // Fallback, falls 'id' nicht gefunden wurde
  }
}
