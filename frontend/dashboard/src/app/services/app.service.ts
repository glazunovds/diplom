import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  addProject(title: string, description: string): Observable<Response> {
    return this.http.post('//localhost:3001/projects', {title: title, description: description});
  }

  getProjectById(id: number): Observable<Response> {
    return this.http.get(`//localhost:3001/projects/${id}`);
  }

  getProjectById(id: number, newItems: any): Observable<Response> {
    return this.http.put(`//localhost:3001/projects/${id}`, newItems);
  }

  deleteProjectById(id: number): Observable<Response> {
    return this.http.delete(`//localhost:3001/projects/${id}`);
  }
}
