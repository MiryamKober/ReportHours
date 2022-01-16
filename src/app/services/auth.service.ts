import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Project } from '../interfaces/project';
import { User } from '../interfaces/user';
import { DataService } from './data.service';
import { ReportService } from './report.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;
  // subUser: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(private http: HttpClient, private dataService: DataService) { }

  login(loginReq: { userName: string, password: string }): Observable<any> {
    this.currentUser = this.dataService.users.find(user => user.userName === loginReq.userName && user.password === loginReq.password);
    return of(this.currentUser)
  }

  getUserProjects(): Project[] {
    const userProjects = this.dataService.project.filter(p => this.currentUser.projectIds.includes(p.id));
    return userProjects;
  }

  getCurrentUser() {
    return this.currentUser;
  }

}
