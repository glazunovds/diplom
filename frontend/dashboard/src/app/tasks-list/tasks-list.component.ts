import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {AppService} from "../services/app.service";
import {NavigationEnd, Router} from "@angular/router";
import * as moment from 'moment';
import * as _ from 'lodash';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements AfterViewInit, OnInit, OnDestroy {

  displayedColumns = ['id', 'author', 'assignee', 'created', 'title', 'status', 'priority'];
  dataSource: MatTableDataSource<Task>;
  project: any = {title: '', description: ''};
  createdAt: any;
  user: any;
  changesSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
              public service: AppService,
              public router: Router) {
    this.dataSource = new MatTableDataSource(tasksData);
    this.changesSub = service.changes.subscribe(() => {
      this.user = service.user;
      /*service.getProjectById(router.url.split('/')[2], localStorage.getItem('id_token')).subscribe((res) => {
       this.project = res;
       this.createdAt = moment(this.project.created_at).format('HH.mm.ss DD.MM.YYYY')
       });*/
    })
  }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.changesSub.unsubscribe();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public deleteProject(): void {
    const project = this.getCurrentProject();
    this.service.deleteProjectById(project._id, localStorage.getItem('id_token')).subscribe(() => {
      this.service.projects = this.service.projects.filter(el => el._id !== project._id);
      this.service.detectChanges();
      this.router.navigateByUrl('/');
    })
  }

  public getCurrentProject(): any {
    return _.find(this.service.projects, {_id: this.router.url.split('/')[2]}) || {title: '', description: '', created_at: Date.now()};
  }

  public getProjectDate(): string {
    return moment(this.getCurrentProject().created_at).format('HH.mm.ss DD.MM.YYYY');
  }

  public editTask(row): void {
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
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima1',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Низкий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Средний'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  },
  {
    id: 1,
    author: 'dima',
    assignee: 'dima',
    created: '12.12.2018 12:00',
    title: 'Пофиксить штуки',
    status: 'В работе',
    priority: 'Высокий'
  }
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
