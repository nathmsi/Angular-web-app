import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  Subscription: Subscription;
  products: Product[] = [];
  dataReceive: boolean = false;
  dataSource = new MatTableDataSource<Product>(this.products);

  displayedColumns: string[] = ['photo','name','count','price','action'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private productService: ProductService) {
  }



  ngOnInit() {
    this.Subscription = this.productService.shoppingCardSubject.subscribe(
      (products: any[]) => {
        this.products = products;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataReceive = true;
      }
    );
    this.productService.emitShoppingCard();
  }

  onDeleteAll() {
    this.productService.deleteProductCard();
    this.dataSource = new MatTableDataSource<Product>([]);
    this.products = [];
  }

  onDeleteOne(id: string){
    this.productService.deleteOneProductCard(id);
  }

  countUpdate(count: number,id: string){
    count >= 1 && this.productService.updateCountProduct(count,id);
  }


   /** Gets the total cost of all transactions. */
   getTotalCost() {
    return this.products.map(t => parseInt(t.price)*t.count).reduce((acc, value) => acc + value, 0);
  }




  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}


// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];
