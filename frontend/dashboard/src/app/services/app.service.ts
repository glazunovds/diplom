import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  public addProject(title: string, description: string): Observable<any> {
    return this.http.post('//localhost:3001/projects', {title: title, description: description})
      .map((response) => response.json());
  }

  public getProjectById(id: number): Observable<any> {
    return this.http.get(`//localhost:3001/projects/${id}`)
      .map((response) => response.json());
  }

  public updateProjectById(id: number, newItems: any): Observable<any> {
    return this.http.put(`//localhost:3001/projects/${id}`, newItems)
      .map((response) => response.json());
  }

  public deleteProjectById(id: number): Observable<any> {
    return this.http.delete(`//localhost:3001/projects/${id}`)
      .map((response) => response.json());
  }
}
