import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  FormValidation: FormGroup;
  fileIsUploading = false;
  fileUrl: string = "";
  fileUploaded = false;
  fileDetected: File = null;
  isKippotCategorie: boolean = false;



  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.FormValidation = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      price: ['', Validators.required],
      photo: ['', [Validators.required] ],
    });
  }

  onSubmit() {
    const name = this.FormValidation.get('name').value;
    const description = this.FormValidation.get('description').value;
    const price = this.FormValidation.get('price').value;
    const categorie = this.FormValidation.get('categorie').value;
    const newProduct = new Product(name, price, description, categorie);
    if (this.isKippotCategorie) {
      newProduct.size = this.FormValidation.get('size').value;
      newProduct.quality = this.FormValidation.get('quality').value;
    }
    if (this.fileUrl && this.fileUrl !== '') {
      newProduct.photo = this.fileUrl;
    }
    this.productService.createNewProduct(newProduct);
    this.router.navigate(['/product']);
  }

  onReturn() {
    this.router.navigate(['/product']);
  }

  detectFiles(event) {
    this.fileDetected = event.target.files[0];
  }
  saveImage() {
    if (this.fileDetected) {
      this.fileIsUploading = true;
      this.productService.uploadFile(this.fileDetected).then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      );
    }

  }

  selectOptionCategorie(value: string) {
    if (value === "Kippots") {
      this.isKippotCategorie = true;
      this.FormValidation = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        categorie: [value, Validators.required],
        price: ['', Validators.required],
        photo: ['', Validators.required],
        size: ['', Validators.required],
        quality: ['', Validators.required],
      });
    } else {
      this.isKippotCategorie = false;
      this.FormValidation = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        categorie: [value, Validators.required],
        price: ['', Validators.required],
        photo: ['', Validators.required],
      });
    }
  }

}
