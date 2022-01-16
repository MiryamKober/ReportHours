import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole } from '../enums/userRole';
import { Project } from '../interfaces/project';
import { Report } from '../interfaces/report';
import { ReportResponse } from '../interfaces/reportsResponse';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users: User[] = [
    { id: "1", userName: "Admin", projectIds: ["1", "4"], password: "111", role: UserRole.ADMIN },
    { id: "2", userName: "Avi", projectIds: ["1", "5"], password: "111", role: UserRole.EMPLOYEE },
    { id: "3", userName: "David", projectIds: ["1", "2", "3"], password: "111", role: UserRole.EMPLOYEE },
  ];

  project: Project[] =
    [{ id: "1", name: "Malam Team" },
    { id: "2", name: "Malam Digital" },
    { id: "3", name: "הפניקס" },
    { id: "4", name: "Cellebrite" },
    { id: "5", name: "משרד הבריאות" },
    ];

  reports: Report[] = [
    { id: "1", userId: "1", beginningTime: '10:10', endTime: '12:20', date: new Date(), projectId: "1" },
    { id: "2", userId: "2", beginningTime: '10:10', endTime: '12:20', date: new Date(), projectId: "1" },
    { id: "3", userId: "2", beginningTime: '10:10', endTime: '12:20', date: new Date(), projectId: "3" },
    { id: "4", userId: "3", beginningTime: '10:10', endTime: '12:20', date: new Date(), projectId: "4" }
  ];

  constructor() { }

  getReports(): Observable<ReportResponse[]> {
    var res: ReportResponse[] = [];
    this.reports.map(s => {
      const projectName = this.project.find(proj => proj.id === s.projectId)?.name;
      const userName = this.users.find(user => user.id === s.userId)?.userName;
      var report: ReportResponse = {
        beginningTime: s.beginningTime,
        date: s.date,
        endTime: s.endTime,
        projectName: projectName,
        userName: userName
      }
      res.push(report);
    })
    return of(res);
  }
}
