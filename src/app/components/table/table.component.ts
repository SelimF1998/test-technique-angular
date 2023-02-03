import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import HomeIcon from '@material-ui/icons/Home';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent {
  tableData: any;
  isIdAsc = false;
  isEmployeeAsc = false;
  isPhoneAsc = false;
  isAgeAsc = false;
  isDOBAsc = false;
  isSalaryAsc = false;
  isAddressAsc = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes = [5, 10, 15, 20];

  constructor(private http: HttpClient) {}

  log = (val: any) => {
    console.log(val);
  };

  sortFn = (params: {
    byId: boolean;
    byEmployee: boolean;
    byPhone: boolean;
    byAge: boolean;
    byDOB: boolean;
    bySalary: boolean;
    byAddress: boolean;
  }) => {
    this.isIdAsc = params.byId ? !this.isIdAsc : this.isIdAsc;
    this.isEmployeeAsc = params.byEmployee
      ? !this.isEmployeeAsc
      : this.isEmployeeAsc;
    this.isPhoneAsc = params.byPhone ? !this.isPhoneAsc : this.isPhoneAsc;
    this.isAgeAsc = params.byAge ? !this.isAgeAsc : this.isAgeAsc;
    this.isDOBAsc = params.byDOB ? !this.isDOBAsc : this.isDOBAsc;
    this.isSalaryAsc = params.bySalary ? !this.isSalaryAsc : this.isSalaryAsc;
    this.isAddressAsc = params.byAddress
      ? !this.isAddressAsc
      : this.isAddressAsc;
    if (params.byId) {
      if (this.isIdAsc) {
        this.tableData.sort((a: any, b: any) => {
          return a.id - b.id;
        });
      } else {
        this.tableData.sort((a: any, b: any) => {
          return b.id - a.id;
        });
      }
    } else if (params.byEmployee) {
      if (this.isEmployeeAsc) {
        this.tableData.sort((a: any, b: any) => {
          let aFullName = a.firstName + a.lastName;
          let bFullName = b.firstName + b.lastName;
          return aFullName.localeCompare(bFullName);
        });
      } else {
        this.tableData.sort((a: any, b: any) => {
          let aFullName = a.firstName + a.lastName;
          let bFullName = b.firstName + b.lastName;
          return bFullName.localeCompare(aFullName);
        });
      }
    } else if (params.byPhone) {
      if (this.isPhoneAsc) {
        this.tableData.sort((a: any, b: any) => {
          return a.contactNumber - b.contactNumber;
        });
      } else {
        this.tableData.sort((a: any, b: any) => {
          return b.contactNumber - a.contactNumber;
        });
      }
    } else if (params.byAge) {
      if (this.isAgeAsc) {
        this.tableData.sort((a: any, b: any) => {
          return a.age - b.age;
        });
      } else {
        this.tableData.sort((a: any, b: any) => {
          return b.age - a.age;
        });
      }
    } else if (params.byDOB) {
      if (this.isDOBAsc) {
        this.tableData.sort((a: any, b: any) => {
          let aSplit = a.dob.split('/');
          console.log(aSplit);

          let bSplit = b.dob.split('/');
          let aDate = new Date(
            Number(aSplit[2]),
            Number(aSplit[1]) - 1,
            Number(aSplit[0])
          );
          let bDate = new Date(
            Number(bSplit[2]),
            Number(bSplit[1]) - 1,
            Number(bSplit[0])
          );
          return aDate.getTime() - bDate.getTime();
        });
      } else {
        this.tableData.sort((a: any, b: any) => {
          let aSplit = a.dob.split('/');
          let bSplit = b.dob.split('/');
          let aDate = new Date(
            Number(aSplit[2]),
            Number(aSplit[1]) - 1,
            Number(aSplit[0])
          );
          let bDate = new Date(
            Number(bSplit[2]),
            Number(bSplit[1]) - 1,
            Number(bSplit[0])
          );
          return bDate.getTime() - aDate.getTime();
        });
      }
    } else if (params.bySalary) {
      if (this.isSalaryAsc) {
        this.tableData.sort((a: any, b: any) => {
          return a.salary - b.salary;
        });
      } else {
        this.tableData.sort((a: any, b: any) => {
          return b.salary - a.salary;
        });
      }
    } else if (params.byAddress) {
      if (this.isAddressAsc) {
        this.tableData.sort((a: any, b: any) => {
          return a.address.localeCompare(b.address);
        });
      } else {
        this.tableData.sort((a: any, b: any) => {
          return b.address.localeCompare(a.address);
        });
      }
    }
  };

  onTableDataChange = (event: any) => {
    this.page = event;
    this.tableData;
  };

  onTableSizeChange = (event: any): void => {
    this.tableSize = event.target.value;
    this.page = 1;
    this.tableData;
  };

  ngOnInit() {
    this.http
      .get('https://hub.dummyapis.com/employee?noofRecords=100&idStarts=1')
      .subscribe((data) => {
        this.tableData = data;
      });
  }
}
