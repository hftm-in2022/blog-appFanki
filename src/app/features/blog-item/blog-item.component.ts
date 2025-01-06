import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Blog } from '../../interfaces/blog';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogItemComponent {
  @Input() blog!: Blog; // Blog-Daten werden über Input gebunden
  @Input() isDetailView = false; // Detailansicht wird als Input gesetzt
}
