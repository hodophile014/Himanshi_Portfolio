import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectDetailComponent } from './project-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Himanshi — Developer' },
  { path: 'project/:id', component: ProjectDetailComponent, title: 'Project — Himanshi' },
  { path: '**', redirectTo: '' },
];
