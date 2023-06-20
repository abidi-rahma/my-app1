import { Component } from '@angular/core';
import { Machine } from 'src/app/models/machine';
import { MachinesService } from 'src/app/services/machines.service';
import { HotToastService } from '@ngneat/hot-toast';
 import { combineLatest, map } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmplyeesService } from 'src/app/services/emplyees.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { doc, docData, addDoc, Firestore, updateDoc, collection, collectionData} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
 import { AngularFirestore, AngularFirestoreCollection , DocumentChangeAction} from '@angular/fire/compat/firestore';
import { Timetable } from 'src/app/models/timetable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 import { TimetableServiceComponent } from 'src/app/services/timetable.service.component';
@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent {

  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  machines: Machine[] = [];
  employees: Employee[] = [];
  timetableEntries: Timetable[] = [];
  timetable :Timetable[] = [];
  selectedDay: string = '';
  selectedEmployeeId: string = '';
  selectedMachineId: string = '';
  selectedOptions: string[] = [];
  dropdownData: any;

  constructor(private firestore: AngularFirestore,private timetableservice:TimetableServiceComponent, private toast: HotToastService,) {}

  ngOnInit() {
    this.timetableservice.getTimetable().subscribe((res:Timetable[]) => {
      this.timetable = res;
    })
    this.fetchEmployees();
    this.fetchMachines();
    this.fetchTimetableEntries();
    this.fetchDropdownData();
  }

  fetchEmployees() {
    
    this.firestore.collection('employees').valueChanges().subscribe((data: any[]) => {
      this.employees = data;
    });
  }

  fetchMachines() {
    
    this.firestore.collection('machines').valueChanges().subscribe((data: any[]) => {
      this.machines = data;
    });
  }

  fetchTimetableEntries() {
    // Fetch timetable entries from Firestore and assign them to this.timetableEntries
    // Replace 'timetable' with the correct collection name in Firestore
    this.firestore.collection('timetable').valueChanges().subscribe((data: any[]) => {
      this.timetableEntries = data;
    });
  }

  
  fetchDropdownData() {
    this.firestore.collection('machines').valueChanges().subscribe((data: any[]) => {
      this.dropdownData = data.map(item => ({ id: item.id, hidden: false }));
      this.resetSelectedOptions();
    });
  }

  resetSelectedOptions() {
    this.selectedOptions = Array(this.dropdownData.length).fill('');
  }

  updateOptions(index: number) {
    const selectedId = this.selectedOptions[index];
    this.hideOptions(selectedId);
  }

  hideOptions(selectedId: string) {
    for (let i = 0; i < this.dropdownData.length; i++) {
      this.dropdownData[i].hidden = (this.dropdownData[i].id === selectedId);
    }
  }



  
  submit() {
    const entry = {
      date: this.selectedDay,
      employee_ref: this.selectedEmployeeId,
      machine_ref: this.selectedMachineId
    };
    
    this.firestore.collection('timetable').add(entry as Timetable)
      .then((docRef) => {
        console.log('Timetable entry added successfully ');
        // Reset the selected values
        
        this.selectedDay = 'please select a day';
        this.selectedEmployeeId = 'please select an employee';
        this.selectedMachineId = 'please select a machine';
      })
      .catch((error) => {
        console.error('Error adding timetable entry:', error);
      });
      
}
}









