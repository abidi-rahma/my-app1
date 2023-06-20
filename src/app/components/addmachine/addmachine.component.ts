import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Machine } from 'src/app/models/machine';
import { MachinesService } from 'src/app/services/machines.service';

@Component({
  selector: 'app-addmachine',
  templateUrl: './addmachine.component.html',
  styleUrls: ['./addmachine.component.css']
})
export class AddmachineComponent {

  AddMachineForm = new FormGroup({
    ref: new FormControl('', Validators.required),
    description: new FormControl(),
  });

  get ref() {
    return this.AddMachineForm.get('ref');
  }

  get description() {
    return this.AddMachineForm.get('description');
  }

  constructor(
    private toast: HotToastService,
    private router: Router,
    private machinesService: MachinesService
     ){ }

     async submit() {
      const newmachine = this.AddMachineForm.value;
      if (!this.AddMachineForm.valid || !newmachine.ref) {
          this.toast.error("Invalid data");
          return;
      }

      if (await this.asyncValidator(newmachine.ref)){
        this.toast.error("Employee already exists");
      }
      else{
        this.machinesService
        .addMachine(newmachine as Machine)
        .pipe(
          this.toast.observe({
            loading: 'Adding machine...',
            success: 'Machine added successfully',
            error: ({ message }) => `${message}`
          })
        )
        .subscribe(() => {
          this.router.navigate(['/display_machine']);
        });
      }
    }
  
    asyncValidator(ref : any) {    
      return new Promise(resolve => {
        this.machinesService.checkRef(ref).then(snapshot => {
          if(snapshot.docs.length > 0){
            resolve({
              "ref taken": true
            });
          } else {
            resolve(null);
          }
        })
      })
    }
}
