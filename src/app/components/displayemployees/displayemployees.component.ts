import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmplyeesService } from 'src/app/services/emplyees.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-displayemployees',
  templateUrl: './displayemployees.component.html',
  styleUrls: ['./displayemployees.component.css']
})

export class DisplayemployeesComponent {

  Employees: Employee[] = [];
  searchEmployee: any;

  SearchEmpForm = new FormGroup({
    cin: new FormControl(''),
    lastname: new FormControl(''),
    position: new FormControl('')
  });

  
  constructor(private employeesService:EmplyeesService,
    private toast: HotToastService) {}

  ngOnInit(){
    this.employeesService.getEmployees().subscribe((res:Employee[]) => {
      this.Employees = res;
    })
  }

  deleteEmployee (employee : Employee){
    if (confirm('Are you sure to delete this employee ?')) {
      this.employeesService.removeEmployee(employee); 
      this.toast.success("Employee deleted successfully");
    }    
  }  

}
