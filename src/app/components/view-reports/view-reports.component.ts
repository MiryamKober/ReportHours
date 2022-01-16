import { Component, OnDestroy, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportResponse } from 'src/app/interfaces/reportsResponse';
import { DataService } from 'src/app/services/data.service';
import { Observable, Subscription } from 'rxjs';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: ReportResponse[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})



export class ViewReportsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['userName', 'projectName', 'date', 'beginningTime', 'endTime'];
  dataSource;
  subReports: Subscription;
  reportList: ReportResponse[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer, private dataService: DataService) { }

  ngOnInit(): void {
    this.subReports = this.dataService.getReports().subscribe(res => {
      this.reportList = res
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource)
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Reports',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.reportList);
  }

  ngOnDestroy(): void {
    this.subReports?.unsubscribe();
  }
}