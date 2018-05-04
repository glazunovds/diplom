import {Component, Inject, OnInit} from '@angular/core';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppService} from "../services/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['./join-project.component.css']
})
export class JoinProjectComponent {

  joinHref: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: AppService,
    public router: Router) {
    this.joinHref = `//localhost:3000/projects/${router.url.split('/')[2]}/join`;
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
