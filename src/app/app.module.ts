import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportHoursComponent } from './components/report-hours/report-hours.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewReportsComponent } from './components/view-reports/view-reports.component';
import { LoginComponent } from './components/login/login.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './gaurds/auth.guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatSortModule } from '@angular/material/sort';
import { ViewReportsGuard } from './gaurds/view-reports.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'report-hours', component: ReportHoursComponent, canActivate: [AuthGuard] },
  { path: 'view-reports', component: ViewReportsComponent, canActivate: [AuthGuard, ViewReportsGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    ReportHoursComponent,
    ViewReportsComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    MatSortModule,
    MatTableModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(routes),
    NgxDatatableModule
    // AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
