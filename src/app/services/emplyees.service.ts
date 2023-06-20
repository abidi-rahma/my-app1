import { Injectable } from '@angular/core';
import { doc, addDoc, Firestore, updateDoc, collection, collectionData} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmplyeesService {

  private dbPath = 'employees';

  constructor(private db: AngularFirestore,
    private firestore : Firestore) { 
      
  } 

  getEmployeeById (uid: string){
    return this.db
    .collection(this.dbPath)
    .doc(uid)
    .valueChanges();
  }

  checkCIN(cin : any) {
    return this.db.collection(this.dbPath).ref.where("cin", "==", cin).get()
  }  

  addEmployee(employee: Employee): any {
    const ref = collection(this.firestore, this.dbPath);
    return from(addDoc(ref, employee));
  }

  updateEmployee(employee: Employee, uid:any): Observable<void> {
    const ref = doc(this.firestore, this.dbPath, uid);
    return from(updateDoc(ref, { ...employee }));
  }

  removeEmployee (employee: Employee) {
    return this.db
    .collection(this.dbPath)
    .doc(employee.uid)
    .delete();
  }

  getEmployees(): Observable<Employee[]> {
    const empsRef = collection(this.firestore, this.dbPath);
    return collectionData(empsRef, { idField: 'uid' }) as Observable<Employee[]>;
  }
    
}


