import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Machine } from 'src/app/models/machine';
import { MachinesService } from 'src/app/services/machines.service';

@Component({
  selector: 'app-displaymachines',
  templateUrl: './displaymachines.component.html',
  styleUrls: ['./displaymachines.component.css']
})
export class DisplaymachinesComponent {
  Machines: Machine[] = [];
  searchMachine: any;

  SearchMachineForm = new FormGroup({
    ref: new FormControl('')
  });

  constructor(private machinesService:MachinesService,
    private toast: HotToastService) {}

  ngOnInit(){
      this.machinesService.getMachines().subscribe((res:Machine[]) => {
        this.Machines = res;
      })
  }

  deleteMachine (machine : Machine){
      if (confirm('Are you sure to delete this machine ?')) {
        this.machinesService.removeMachine(machine); 
        this.toast.success("Machine deleted successfully");
      }    
  }

}
