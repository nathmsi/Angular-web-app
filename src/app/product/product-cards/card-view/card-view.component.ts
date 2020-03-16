import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {

  @Input() product: Product;
  @Input() onDeleteProduct: any;
  @Input() onAddToCard: any;

  constructor() { }

  ngOnInit(): void {
  }

}
