import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogPageComponent } from './add-blog-page.component';

const routes: Routes = [{ path: '', component: AddBlogPageComponent }];

@NgModule({
  declarations: [AddBlogPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AddBlogPageModule {}
