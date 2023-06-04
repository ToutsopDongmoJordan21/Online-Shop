import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../admin/managment/managment.component';
import { ProductService } from './serviceProduct/product.service';
import firebase from 'firebase/compat/app';
import {environment} from "../../environments/environment";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
    private productService: ProductService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.product = new Product();

    this.productService.getProductInfos(id)
      .subscribe((data: any) => {
        this.product = data;
      })

  }

}
