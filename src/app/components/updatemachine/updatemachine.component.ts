import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MachinesService } from 'src/app/services/machines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Machine } from 'src/app/models/machine';

@Component({
  selector: 'app-updatemachine',
  templateUrl: './updatemachine.component.html',
  styleUrls: ['./updatemachine.component.css']
})
export class UpdatemachineComponent {

  empId: any;

  updateMachineForm = new FormGroup({
    ref: new FormControl('', Validators.required),
    description: new FormControl(),
  });

  constructor(private machinesService:MachinesService,
    private toast: HotToastService,
    private formBuilder : FormBuilder,
    private router : Router,
    private act : ActivatedRoute
    )
  {}

  get ref() {
    return this.updateMachineForm.get('ref');
  }

  get description() {
    return this.updateMachineForm.get('description');
  }

  ngOnInit(): void{
    const uid = this.act.snapshot.paramMap.get('uid');
    if (uid != null){
      this.machinesService.getMachineById(uid).subscribe(res => {
        this.empId = res;
        this.updateMachineForm = this.formBuilder.group({
          ref:[this.empId.ref],
          description:[this.empId.description]          
        })
      })
    }
  }

  async submit() {
    const uid = this.act.snapshot.paramMap.get('uid');
    const updatedmachine = this.updateMachineForm.value;
    this.machinesService.updateMachine(updatedmachine as Machine,uid).pipe(
      this.toast.observe({
        loading: 'Saving machine changes...',
        success: 'Machine updated successfully',
        error: 'There was an error in updating the machine',
      })
    )
    .subscribe(() => {
      this.router.navigate(['/display_machine']);
    });

  }
}
