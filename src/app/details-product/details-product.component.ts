import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../admin/managment/managment.component';
import { ProductService } from './serviceProduct/product.service';
import firebase from 'firebase/compat/app';
import { getStorage, ref } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {
  public firebaseApp : any;
  public db : any;
  public storage:any;
  public storageRef: any;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
    this.db = this.firebaseApp.firestore()
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.product = new Product();


    this.db.collection("product")
      .doc(id)
      .get()
      // @ts-ignore
      .then(snapshot => {
        // @ts-ignore

          const  product= new Product();
          product.id = snapshot.id;
          product.name= snapshot.data()['name'];
          product.description = snapshot.data()['description'];
          product.price= snapshot.data()['price'];
          product.imageUrl= snapshot.data()['image'];
          product.price= snapshot.data()['price'];
          console.log(snapshot.data());
          this.product=product;

      })
      // @ts-ignore
      .catch(err => {
        console.log('Error getting documents', err);
      });


  }

}
