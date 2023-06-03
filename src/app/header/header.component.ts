import { Component, OnInit } from '@angular/core';
import { Category, Product } from '../admin/managment/managment.component';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public allCategory: Array<Category> = [];
  public selectedCategory: Category | undefined;
  public productsCategory: Array<Product> = [];
  public db : any;
  public storage:any;
  public storageRef: any;
  public uploadMessage: any;
  public firebaseApp : any;

  constructor() {
    this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
    this.db = this.firebaseApp.firestore()
    this.storage = getStorage();
    this.storageRef = ref(this.storage, 'images');
  }

  ngOnInit(): void {
    this. getAllCategory();
  }

  async getAllCategory(){


    const collection = await this.db.collection('category').get()
      // @ts-ignore
      .then(snapshot => {
        // @ts-ignore
        snapshot.forEach( doc => {
          const  category= new Category();
          category.id=doc.id;
          category.name= doc.data()['name'];
          category.description = doc.data()['description'];
          this.allCategory.push(category);
        });
      })
      // @ts-ignore
      .catch(err => {
        console.log('Error getting documents', err);
      });

    console.log(this.allCategory);

  }

  selectCategory( item: Category){
    this.selectedCategory= item;
    this.getAllbyCategory();
  }

  async getAllbyCategory(){


    const collection = await this.db.collection('category').doc(this.selectedCategory?.id).collection('product').get()
      // @ts-ignore
      .then(snapshot => {
        // @ts-ignore
        snapshot.forEach( doc => {
          const  product= new Product();
          product.id = doc.id;
          product.name= doc.data()['name'];
          product.description = doc.data()['description'];
          product.price= doc.data()['price'];
          product.imageUrl= doc.data()['image'];
          product.price= doc.data()['price'];
          console.log(doc.data());
          this.productsCategory.push(product);
        });
      })
      // @ts-ignore
      .catch(err => {
        console.log('Error getting documents', err);
      });

    console.log(this.productsCategory);

  }

}
