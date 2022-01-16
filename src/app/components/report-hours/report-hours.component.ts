import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, take } from 'rxjs/operators';
import { Project } from 'src/app/interfaces/project';
import { Report } from 'src/app/interfaces/report';
import { ReportRequest } from 'src/app/interfaces/reportRequest';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-hours',
  templateUrl: './report-hours.component.html',
  styleUrls: ['./report-hours.component.css']
})
export class ReportHoursComponent implements OnInit {
  reportForm: FormGroup;
  userProjects: Project[] = [];
  reportedSuccessfully = false;
  user: User;
  submitted: boolean = false;

  constructor(private reportService: ReportService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.userProjects = this.authService.getUserProjects();
    this.reportForm = new FormGroup({
      userName: new FormControl({ value: this.user.userName, disabled: true }, Validators.required),
      projectId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      beginningTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required)
    });
  }

  submitForm() {
    this.submitted = true;
    const report = this.reportForm.value as ReportRequest;
    report.userId = this.user.id;
    this.reportService.sendReport(report).pipe(take(1)).subscribe(() => {
      this.reportForm.reset();
      this.reportedSuccessfully = true;
    })
  }
  addNewReport() {
    this.reportedSuccessfully = false;
    this.submitted = false;
  }
}
