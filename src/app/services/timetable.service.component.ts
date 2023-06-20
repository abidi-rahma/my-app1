import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { doc, docData, addDoc, Firestore, updateDoc, collection, collectionData} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Timetable } from '../models/timetable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class TimetableServiceComponent {
  
      private dbPath = 'timetable';
  
      constructor(private db: AngularFirestore,
        private firestore : Firestore) { 
          
      } 
      
  // removeTimetable (timetable: Timetable) {
  //     return this.db
  //     .collection('timetable')
  //     .doc(timetable.day)
  //     .delete();
  //   }
    
  getTimetable(): Observable<Timetable[]> {
    const TimeRef = collection(this.firestore, 'timetable');
    return collectionData(TimeRef, { idField: 'uid' }) as Observable<Timetable[]>;
  }
  
  }

