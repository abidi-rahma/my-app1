import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Employee } from 'src/app/models/employee';
import { EmplyeesService } from 'src/app/services/emplyees.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  empRef: any;
  updateEmpForm = new FormGroup({
    cin: new FormControl('', Validators.required),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private employeesService:EmplyeesService,
    private toast: HotToastService,
    private formBuilder : FormBuilder,
    private router : Router,
    private act : ActivatedRoute
    )
  {}

  get cin() {
    return this.updateEmpForm.get('cin');
  }

  get firstname() {
    return this.updateEmpForm.get('firstname');
  }

  get lastname() {
    return this.updateEmpForm.get('lastname');
  }

  get position() {
    return this.updateEmpForm.get('position');
  }

  get phone() {
    return this.updateEmpForm.get('phone');
  }

  get email() {
    return this.updateEmpForm.get('email');
  }

  ngOnInit(): void{
    const uid = this.act.snapshot.paramMap.get('uid');
    if (uid != null){
      this.employeesService.getEmployeeById(uid).subscribe(res => {
        this.empRef = res;
        this.updateEmpForm = this.formBuilder.group({
          cin:[this.empRef.cin],
          firstname:[this.empRef.firstname],
          lastname:[this.empRef.lastname],
          position:[this.empRef.position],
          phone:[this.empRef.phone],
          email:[this.empRef.email]
        })
      })
    }
  }

  async submit() {
    const uid = this.act.snapshot.paramMap.get('uid');
    const updatedemp = this.updateEmpForm.value;
    this.employeesService.updateEmployee(updatedemp as Employee,uid).pipe(
      this.toast.observe({
        loading: 'Saving employee profile changes...',
        success: 'Employee profile updated successfully',
        error: 'There was an error in updating the profile',
      })
    )
    .subscribe(() => {
      this.router.navigate(['/display_employee']);
    });

  }

}
