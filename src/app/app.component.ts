import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoComponent } from './demo/demo.component'; // Importiere die DemoComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemoComponent], // Füge die DemoComponent hier hinzu
  template: `
    <h1>{{ title }}</h1>
    <app-demo></app-demo>
    <!-- Verwende den Selector der DemoComponent -->
  `,
  styleUrls: ['./app.component.scss'], // StyleUrls anstelle von styleUrl
})
export class AppComponent {
  title = 'blog-app';
}
