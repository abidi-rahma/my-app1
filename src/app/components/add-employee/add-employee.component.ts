import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Employee } from 'src/app/models/employee';
import { EmplyeesService } from 'src/app/services/emplyees.service';
import 'src/assets/smtp.js';  

declare let Email: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  cin_value : string | undefined

  positions = [
    "Ouvrier",
    "Technicien",
    "Ingénieur",
    "Chef d'atelier"
  ]
  
  AddEmpForm = new FormGroup({
    cin: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required,  Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username : new FormControl(''),
    password : new FormControl('')
  });

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  get cin() {
    return this.AddEmpForm.get('cin');
  }

  get firstname() {
    return this.AddEmpForm.get('firstname');
  }

  get lastname() {
    return this.AddEmpForm.get('lastname');
  }

  get position() {
    return this.AddEmpForm.get('position');
  }

  get phone() {
    return this.AddEmpForm.get('phone');
  }

  get username() {
    return this.AddEmpForm.get('username');
  }

  get password() {
    return this.AddEmpForm.get('password');
  }

  get email() {
    return this.AddEmpForm.get('email');
  }

  constructor(
    private toast: HotToastService,
    private router: Router,
    private employeeService: EmplyeesService
     ){
      this.AddEmpForm.patchValue({
        password: this.generatePassword(8),
        });
     }

  async submit() {
      const newemp = this.AddEmpForm.value;
      newemp.username = newemp.cin;
      if (!this.AddEmpForm.valid || !newemp.cin || !newemp.firstname || !newemp.lastname 
        || !newemp.position || !newemp.phone || !newemp.email || !newemp.username || !newemp.password) {
          this.toast.error("Invalid data");
          return;
      }

      if (await this.asyncValidator(newemp.cin)){
        this.toast.error("Employee already exists");
      }
      else{
        this.employeeService
        .addEmployee(newemp as Employee)
        .pipe(
          this.toast.observe({
            loading: 'Adding employee...',
            success: 'Employee added successfully',
            error: ({ message }) => `${message}`
          })
        )
        .subscribe(() => {
          this.sendEmail(newemp.email, newemp.username, newemp.password, newemp.firstname)
          this.router.navigate(['/display_employee']);
        });
      }
  }

  asyncValidator(cin : any) {    
    return new Promise(resolve => {
      this.employeeService.checkCIN(cin).then(snapshot => {
        if(snapshot.docs.length > 0){
          resolve({
            "cin taken": true
          });
        } else {
          resolve(null);
        }
      })
    })
  }

  generatePassword(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  } 

  sendEmail (to: string|null|undefined, username:string|null|undefined, 
    password:string|null|undefined, firstname:string|null|undefined) {
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'boitedetestdsi3@gmail.com',
      Password : 'BD383E9FAE98C9F8F3F25CCEA1E903D2C1D0',
      To : to,
      From : 'boitedetestdsi3@gmail.com',
      Subject : 'Nouveau compte',
      Body : '<i>Bonjour <b>'+firstname+'</b></i> <br/>'
      +'<i>Vos coordonées d\'accés sont : <i/> <br/>'
      +'<i>Nom d\'utilisateur : <b>'+username+'</b></i> <br/>'
      +'<i>Mot de passe : <b>'+password+'</b></i>'
    } ).then( (message: any) => {this.toast.show(message); } );
  } 
 
  
}
