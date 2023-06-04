import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public firebaseApp : any;
  public db : any;

  constructor() {
    this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
    this.db = this.firebaseApp.firestore() }

  getProductInfos(id: any) {
    return this.db.collection("product")
    .doc(id)
    .get()

  }
}
