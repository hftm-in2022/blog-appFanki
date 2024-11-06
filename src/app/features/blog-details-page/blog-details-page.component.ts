import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../interfaces/blog';
import { CommonModule } from '@angular/common'; // CommonModule importieren

@Component({
  selector: 'app-blog-details-page',
  standalone: true,
  imports: [CommonModule], // CommonModule hier hinzufügen
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.scss'],
})
export class BlogDetailsPageComponent implements OnInit {
  blog: Blog | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.loadBlogDetails(Number(blogId));
    }
  }

  loadBlogDetails(id: number): void {
    this.blogService.getBlogDetails(id).subscribe((blog: Blog) => {
      this.blog = blog;
    });
  }
}
