import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import {ProjectsListComponent} from "./projects-list/projects-list.component";
import {TasksListComponent} from "./tasks-list/tasks-list.component";
import {JoinProjectPageComponent} from "./join-project-page/join-project-page.component";

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'projects/:id/tasks',
    component: TasksListComponent
  },
  {
    path: 'projects/:id/join',
    component: JoinProjectPageComponent
  },
  { path: '**', redirectTo: '' }
];
