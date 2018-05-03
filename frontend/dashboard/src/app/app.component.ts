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

  constructor(public auth: AuthService,
              public router: Router,
              public dialog: MatDialog,
              public http: Http,
              public service: AppService) {
    auth.handleAuthentication();
    http.get('http://127.0.0.1:3001/me').subscribe(res => console.log(res));
  }

  addProject() {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  joinProject() {
    const dialogRef = this.dialog.open(JoinProjectComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  login() {
    location.href = '//localhost:3001/login';
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

}
