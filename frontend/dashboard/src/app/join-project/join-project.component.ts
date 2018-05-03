import {Component, Inject, OnInit} from '@angular/core';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-join-project',
  templateUrl: './join-project.component.html',
  styleUrls: ['./join-project.component.css']
})
export class JoinProjectComponent {

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
