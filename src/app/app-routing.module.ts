import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import {LoginComponent} from "./admin/login/login.component";
import {ManagmentComponent} from "./admin/managment/managment.component";

const routes: Routes = [
  { path: '', component: ProductComponent},
  { path: 'produit', component: ProductComponent},
  { path: 'details', component: DetailsProductComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin/product', component: ManagmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
