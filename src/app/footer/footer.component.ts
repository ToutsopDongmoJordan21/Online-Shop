import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { getStorage, ref } from 'firebase/storage';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../details-product/serviceProduct/product.service";
import {environment} from "../../environments/environment";
import {Category, Product} from "../admin/managment/managment.component";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public firebaseApp : any;
  public db : any;
  public productsCategory:Array<Product> = [];
  public allCategory:Array<Category> = [];
  constructor( private router: Router) {
    this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
    this.db = this.firebaseApp.firestore()
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
  }

  async getAllProduct(){
    this.productsCategory=[];

    const collection = await this.db.collection('product').get()

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
  getDetail(item:Product){
    console.log(item);
    this.router.navigate(['details', item.id]);
  }

}
