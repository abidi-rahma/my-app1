import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DisplayemployeesComponent } from './components/displayemployees/displayemployees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { DisplaymachinesComponent } from './components/displaymachines/displaymachines.component';
import { AddmachineComponent } from './components/addmachine/addmachine.component';
import { UpdatemachineComponent } from './components/updatemachine/updatemachine.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [  
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'display_employee',
    component: DisplayemployeesComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'add_employee',
    component: AddEmployeeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'update_employee/:uid',
    component: UpdateEmployeeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'display_machine',
    component: DisplaymachinesComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'add_machine',
    component: AddmachineComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'update_machine/:uid',
    component: UpdatemachineComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'Time-Table',
    component: TimeTableComponent,
    ...canActivate(redirectUnauthorizedToLogin),
 },
 {
   path: 'Statistics',
   component: StatisticsComponent,
   ...canActivate(redirectUnauthorizedToLogin),
}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
