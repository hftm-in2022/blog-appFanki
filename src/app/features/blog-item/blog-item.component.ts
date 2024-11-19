import { Component, Input } from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // CommonModule importieren

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule], // CommonModule zu den Imports hinzufügen
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
})
export class BlogItemComponent {
  @Input() blog!: Blog;
  @Input() isDetailView = false; // Neuer Input für die Detailansicht
}
