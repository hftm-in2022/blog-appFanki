import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsPageComponent } from './blog-details-page.component';

const routes: Routes = [{ path: '', component: BlogDetailsPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlogDetailsPageComponent, // Importiere die Standalone-Komponente hier direkt
  ],
})
export class BlogDetailsModule {}
