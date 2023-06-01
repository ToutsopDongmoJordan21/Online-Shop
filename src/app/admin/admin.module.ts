import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ManagmentComponent } from './managment/managment.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    LoginComponent,
    ManagmentComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
