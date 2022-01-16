import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/userRole';
import { AuthService } from 'src/app/services/auth.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.authService.login(this.loginForm.value).subscribe(user => {
      if (user) {
        if (user.role === UserRole.ADMIN) {
          this.router.navigate(['view-reports']);
        }
        else {
          this.router.navigate(['home']);
        }
      }
      else {
        alert('אחד או יותר מהנתונים שהוקשו שגוי')
      }
    })
  }
}
