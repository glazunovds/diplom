import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {AppService} from '../services/app.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: AppService) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addProject(title: string, description: string) {
    this.service.addProject(title, description).subscribe(res => this.dialogRef.close());
  }

}
