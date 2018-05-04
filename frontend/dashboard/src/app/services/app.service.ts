import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AppService {

  user: any;
  projects: any = [];
  currentProject: any;
  headers: any;
  changes: any;

  constructor(private http: HttpClient) {
    this.changes = new Subject();
  }

  public setHeaders(token: string): void {
    this.headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
  }

  public addProject(title: string, description: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.post('//localhost:3001/projects', {title: title, description: description}, {headers})
      .map((response) => {this.projects.push(response); this.changes.next(); return response; });
  }

  public getProject(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get(`//localhost:3001/projects/${id}`, {headers})
      .map((response) => {this.projects.push(response); this.currentProject = response; this.changes.next(); });
  }

  public getProjectById(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get(`//localhost:3001/projects/${id}`, {headers});
  }

  public updateProjectById(id: number, newItems: any): Observable<any> {
    return this.http.put(`//localhost:3001/projects/${id}`, newItems)
      .map((response) => response);
  }

  public deleteProjectById(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.delete(`//localhost:3001/projects/${id}`, {headers});
  }

  public detectChanges(): void {
    this.changes.next();
  }

  public getUser(token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get(`//localhost:3001/me/`, {headers})
      .map(res => {this.user = res; this.changes.next(); });
  }

  public joinProject(token: string, projectId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.put(`//localhost:3001/projects/${projectId}/users/${this.user._id}`, {}, {headers})
      .map(res => { console.log(res); this.changes.next(); return res; });

  }

  public getUserById(token: string, userId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get(`//localhost:3001/users/${userId}`, {headers})
      .map(res => { console.log(res); return res; });
  }
}
