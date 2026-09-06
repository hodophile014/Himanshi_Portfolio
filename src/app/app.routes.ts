import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectDetailComponent } from './project-detail.component';
import { BlogComponent } from './blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Himanshi — Developer' },
  { path: 'blog', component: BlogComponent, title: 'Blog — Himanshi' },
  { path: 'project/:id', component: ProjectDetailComponent, title: 'Project — Himanshi' },
  { path: '**', redirectTo: '' },
];
