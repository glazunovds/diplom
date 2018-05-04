import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddProjectComponent} from './add-project/add-project.component';
import {JoinProjectComponent} from './join-project/join-project.component';
import {Http} from '@angular/http';
import {AddTaskComponent} from './add-task/add-task.component';
import {AppService} from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any;
  projects: any;

  constructor(public auth: AuthService,
              public router: Router,
              public dialog: MatDialog,
              public http: Http,
              public service: AppService) {
    auth.handleAuthentication();
    if (auth.isAuthenticated()) {
      service.getUser(localStorage.getItem('id_token')).subscribe(() => {
        service.user.project_ids.forEach(projectId => {
          service.getProject(projectId, localStorage.getItem('id_token')).subscribe();
        });
      });
    }
    service.changes.subscribe(() => {
      this.user = service.user;
      this.projects = service.projects;
    })
  }

  public addProject(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  public joinProject(): void {
    const dialogRef = this.dialog.open(JoinProjectComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  public login(): void {
    location.href = '//localhost:3001/login';
  }

  public addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
}
