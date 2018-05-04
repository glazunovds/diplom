import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {AppService} from '../services/app.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public service: AppService,
              public router: Router) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public addProject(title: string, description: string): void {
    this.service.addProject(title, description, localStorage.getItem('id_token')).subscribe(res => {
      this.dialogRef.close();
      console.log(res);
      this.router.navigateByUrl(`/projects/${res._id}/tasks`);
    });
  }

}
