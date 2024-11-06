import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogOverviewPageComponent } from './blog-overview-page.component';

const routes: Routes = [{ path: '', component: BlogOverviewPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlogOverviewPageComponent, // Importiere die Standalone-Komponente hier direkt
  ],
})
export class BlogOverviewModule {}
