import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  booksSubscription: Subscription;


  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  addProduct(){
    this.router.navigate(['/product', 'new']);
  }

  onDeleteProduct = (product: Product) =>{
    console.log(product);
    // this.productService.removeProduct(product);
  }



}
