import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {EditTaskComponent} from "../edit-task/edit-task.component";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements AfterViewInit {

  displayedColumns = ['id', 'author', 'assignee', 'created', 'title', 'status', 'priority'];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(tasksData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editTask(row) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '900px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

export const tasksData: Task[] = [
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima1', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Низкий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Средний'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'},
  {id: 1, author: 'dima', assignee: 'dima', created: '12.12.2018 12:00', title: 'Пофиксить штуки', status: 'В работе', priority: 'Высокий'}

];

export interface Task {
  id: number;
  author: string;
  assignee: string;
  created: string;
  title: string;
  status: string;
  priority: string;
}
