import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {FormControl, FormGroup, Validators} from "@angular/forms";
export class Category {
  id: string | undefined;
  name: string | undefined;
  description: string | undefined;
};

export class Product {
  name: string | undefined;
  description: string | undefined;
  price: number | undefined;
  categoryId: string | undefined;
  id: any;
  imageUrl: string | undefined ;
};

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class ManagmentComponent implements OnInit {
public firebaseApp : any;
public categoryForm!: FormGroup;
public productForm!: FormGroup;
// @ts-ignore
  public imageUrl:string;
// @ts-ignore
  public fileName: string;
// @ts-ignore
  public allCategory: Array<Category> = [];
public selectedCategory: Category | undefined;
public productsCategory: Array<Product> = [];
public db : any;
public storage:any;
public storageRef: any;
public uploadMessage: any;
  constructor() {
     this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
     this.db = this.firebaseApp.firestore()
     this.storage = getStorage();
     this.storageRef = ref(this.storage, 'images');
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),

    });
    this. getAllCategory();
  }

  createCategory(){
    this.db.collection("category").doc().set({
      name: this.categoryForm.get('name')!.value,
      description: this.categoryForm.get('description')!.value,
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error:any) => {
        console.error("Error writing document: ", error);
      });
    this.getAllCategory();

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

  createProduct(){
    // @ts-ignore
    this.db.collection("category").doc(this.selectedCategory?.id).collection('product').doc().set({
      name: this.productForm.get('name')!.value,
      // @ts-ignore
      categoryId: 'this.selectedCategory.id',
      description: this.productForm.get('description')!.value,
      price: this.productForm.get('price')!.value,
      image: this.imageUrl
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error:any) => {
        console.error("Error writing document: ", error);
      });

    this.getAllbyCategory()

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

  // @ts-ignore
  onFileSelected(event) {
    this.uploadMessage='upload in progress';
    const file:File = event.target.files[0];
    if (file) {
    this.fileName= file.name;
      uploadBytes(this.storageRef, file).then((snapshot) => {

        console.log('Uploaded a blob or file!', snapshot);
        getDownloadURL(snapshot.ref).then(downloadURL => {
          console.log('Download link to your Uint8Array: ', downloadURL);
          this.uploadMessage='upload in completed';
          this.imageUrl= downloadURL;
        });
      });

    }
  }
  checkDisable(){
    if (this.imageUrl && this.selectedCategory){
      return false;
    }
    return true;
  }
}
