import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-details-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.scss'],
})
export class BlogDetailsPageComponent implements OnInit {
  blog: Blog | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Zugriff auf die vom Resolver geladenen Blog-Daten
    this.blog = this.route.snapshot.data['blog'];
  }
}
