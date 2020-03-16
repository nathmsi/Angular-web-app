import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Film } from '../models/film.model';
import { Product } from '../models/product.model';
// key that is used to access the data in local storage
const STORAGE_KEY = 'List Film Liked';
const STORAGE_KEY_PRODUCTS = 'List Shopping Card';

@Injectable()
export class LocalStorageService {

    anotherTodolist = [];
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }



    // Film liked

    storeOnLocalStorageFilm(film: Film[]): void {
        this.storage.set(STORAGE_KEY, film);
        console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
    }
    getLocalStorageFilm(): any {
        console.log("%c Local Storage Film Liked getLocalStorageFilm()", "color:orange", this.storage.get(STORAGE_KEY));
        return this.storage.get(STORAGE_KEY) ? this.storage.get(STORAGE_KEY) : [];
    }




    // shopping card 

    storeOnLocalStorageProductCard(product: Product): void {
        let products = this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
        let countProducById = products.filter(e => e.id === product.id).length;
        if (countProducById === 0) {
            product.count = 1;
            products.push(product);
        } else {
            products.forEach(e => {
                if (e.id === product.id) {
                    e.count = e.count + 1;
                }
            })
        }
        this.storage.set(STORAGE_KEY_PRODUCTS, products);
        console.log('Shopping Card storeOnLocalStorageProductCard()', products || 'LocaL storage is empty');
    }
    getLocalStorageProductCard(): any {
        console.log("%c Local Storage Shopping Card getLocalStorageProductCard() ", "color:orange", this.storage.get(STORAGE_KEY_PRODUCTS));
        return this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
    }

    deleteProductCard() {
        console.log("%c Local Storage Shopping deleteProductCard() ", "color:orange");
        this.storage.set(STORAGE_KEY_PRODUCTS, []);
    }

    deleteOneProductCard(id: string) {
        let products = this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
        products = products.filter(e => e.id !== id);
        this.storage.set(STORAGE_KEY_PRODUCTS, products);
        console.log('Shopping Card deleteOneProductCard()', products || 'LocaL storage is empty');
    }

    updateCountProduct(count: number, id: string) {
        let products = this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
        products.forEach(e => {
            if (e.id === id) {
                e.count = count;
            }
        })
        this.storage.set(STORAGE_KEY_PRODUCTS, products);
        console.log('Shopping Card updateCountProduct()', products || 'LocaL storage is empty');
    }





}