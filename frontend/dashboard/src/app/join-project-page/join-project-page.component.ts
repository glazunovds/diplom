import { Component, OnInit } from '@angular/core';
import {AppService} from "../services/app.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-join-project-page',
  templateUrl: './join-project-page.component.html',
  styleUrls: ['./join-project-page.component.css']
})
export class JoinProjectPageComponent implements OnInit {

  constructor(public service: AppService,
              public router: Router,
              public auth: AuthService) {
    auth.handleAuthentication();
    if (auth.isAuthenticated()) {
      service.getUser(localStorage.getItem('id_token')).subscribe(() => {
        service.joinProject(localStorage.getItem('id_token'), this.router.url.split('/')[2]).subscribe(res => {
          console.log(res);
          //todo relocate to project
        });
      });
    }
  }

  ngOnInit() {
  }

}
