import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {

  @Input() categorie: string;

  products: Product[] = [];
  Subscription: Subscription;
  dataReceive: boolean = false;

  productFilter: Product[] = [];
  sizeSelected: string = "";
  qualitySelected: string = "";



  constructor(private router: Router, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.Subscription = this.productService.productsSubject.subscribe(
      (products: Product[]) => {
        if (this.categorie !== 'All') {
          this.products = products.filter(e => e.categorie === this.categorie);
        } else {
          this.products = products;
        }
        this.productFilter = this.products;
        this.sizeSelected = "";
        this.qualitySelected = "";
        if (products.length > 0) {
          this.dataReceive = true;
          console.log("%c PRODUCTS categorie \n array object products", "color:orange", this.productFilter);
        }
      }
    );
    this.productService.emitProduct();
  }


  onSubmitForm() {

  }

  onDeleteProduct() {

  }

  onAddToCard = (product: Product) => {
    this.productService.addToShoppingCard(product);
  }

  selectOptionSize() {
    console.log(this.qualitySelected, this.sizeSelected);

    if (this.sizeSelected === "" && this.qualitySelected === "") {
      this.productFilter = this.products;
    }
    else if (this.sizeSelected !== "" && this.qualitySelected !== "") {
      this.productFilter = this.products.filter(e => e.size === this.sizeSelected && e.quality === this.qualitySelected);
    }
    else if (this.sizeSelected !== "" && this.qualitySelected === "") {
      this.productFilter = this.products.filter(e => e.size === this.sizeSelected);
    }
    else {
      this.productFilter = this.products.filter(e => e.quality === this.qualitySelected);
    }

  }

  selectOptionQuality() {
    if (this.qualitySelected === "" && this.sizeSelected === "") {
      this.productFilter = this.products;
    }
    else if (this.qualitySelected !== "" && this.sizeSelected !== "") {
      this.productFilter = this.products.filter(e => e.size === this.sizeSelected && e.quality === this.qualitySelected);
    }
    else if (this.qualitySelected !== "" && this.sizeSelected === "") {
      this.productFilter = this.products.filter(e => e.quality === this.qualitySelected);
    }
    else {
      this.productFilter = this.products.filter(e => e.size === this.sizeSelected);
    }

  }


  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }



}
