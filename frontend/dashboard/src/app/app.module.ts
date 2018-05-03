import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ROUTES } from './app.routes';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule, MatSelectModule, MatOptionModule, MatTableModule, MatPaginatorModule, MatInputModule,
  MatSortModule, MatProgressSpinnerModule, MatListModule, MatDialogModule, MatDialog
} from '@angular/material';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { JoinProjectComponent } from './join-project/join-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import {AppService} from './services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    TasksListComponent,
    ProjectsListComponent,
    EditTaskComponent,
    AddProjectComponent,
    JoinProjectComponent,
    AddTaskComponent
  ],
  entryComponents: [
    EditTaskComponent,
    AddProjectComponent,
    JoinProjectComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
