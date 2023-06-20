import { Injectable } from '@angular/core';
import { doc, addDoc, Firestore, updateDoc, collection, collectionData} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  private dbPath = 'machines';

  constructor(private db: AngularFirestore,
    private firestore : Firestore) { 
      
  } 

  getMachines(): Observable<Machine[]> {
    const machinesRef = collection(this.firestore, this.dbPath);
    return collectionData(machinesRef, { idField: 'uid' }) as Observable<Machine[]>;
  }

  removeMachine (machine: Machine) {
    return this.db
    .collection(this.dbPath)
    .doc(machine.uid)
    .delete();
  }

  addMachine(machine: Machine): any {
    const ref = collection(this.firestore, this.dbPath);
    return from(addDoc(ref, machine));
  }

  checkRef(ref : any) {
    return this.db.collection(this.dbPath).ref.where("ref", "==", ref).get()
  }  

  getMachineById (uid: string){
    return this.db
    .collection(this.dbPath)
    .doc(uid)
    .valueChanges();
  }

  updateMachine(machine: Machine, uid:any): Observable<void> {
    const ref = doc(this.firestore, this.dbPath, uid);
    return from(updateDoc(ref, { ...machine }));
  }
}
