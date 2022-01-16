import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserRole } from '../enums/userRole';
import { Project } from '../interfaces/project';
import { Report } from '../interfaces/report';
import { ReportRequest } from '../interfaces/reportRequest';
import { User } from '../interfaces/user';
import { DataService } from './data.service';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class ReportService {


  constructor(private dataService:DataService) { }

  sendReport(report: Report):Observable<any> {
    report.id = uuid.v4();
    this.dataService.reports.push(report);
    return of(report)
  }

}
