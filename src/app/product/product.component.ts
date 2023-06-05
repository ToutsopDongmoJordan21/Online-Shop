import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { getStorage, ref } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { Category, Product } from '../admin/managment/managment.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('stickyMenu') menuElement!: ElementRef;

  public allCategory: Array<Category> = [];
  public selectedCategory: Category | undefined;
  public productsCategory: Array<Product> = [];
  public db : any;
  public storage:any;
  public storageRef: any;
  public uploadMessage: any;
  public firebaseApp : any;
  sticky: boolean = false;
  elementPosition: any;

  constructor(
    private router: Router,) {

    this.firebaseApp = firebase.initializeApp(environment.firebaseConfig);
    this.db = this.firebaseApp.firestore()
    this.storage = getStorage();
    this.storageRef = ref(this.storage, 'images');
  }

  ngOnInit(): void {
    this. getAllCategory();
    this.getAllProduct();
  }

  ngAfterViewInit(){
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll >= this.elementPosition){
        this.sticky = true;
      } else {
        this.sticky = true;
      }
    }

  async getAllCategory(){

    console.log('startttttttt');


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
          console.log('enter');
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
    this.productsCategory=[];

    const collection = await this.db.collection('product').where('categoryId','==',this.selectedCategory?.id).get()
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

  direct(id: number) {
    this.router.navigate(['details', id]);
  }


}
