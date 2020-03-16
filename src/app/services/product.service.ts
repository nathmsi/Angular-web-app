import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.model';

import * as firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/storage';

import { AuthService } from './auth.service';

import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { LocalStorageService } from './storageLocal.service';



@Injectable()
export class ProductService {

    products: Product[] = [];
    productsshoppingCard: Product[] = [];
    productsSubject = new Subject<Product[]>();
    shoppingCardSubject = new Subject<Product[]>();
    userUid: string = "";
    userSubscription: Subscription;

    constructor(private authService: AuthService ,  private localStorageService: LocalStorageService) {
        this.userSubscription = this.authService.userSubject.subscribe(
            (user: User) => {
                this.userUid = user.uid;
            }
        );
        this.authService.emitUser();
    }

    emitProduct() {
        this.productsSubject.next(this.products);
    }

    emitShoppingCard(){
        this.shoppingCardSubject.next(this.productsshoppingCard);
    }

    getProducts() {
        console.log("%c getProducts() ", "color:yellow");
        firebase.database().ref('/products')
            .on('value', (data) => {
                const dataR = data.val() ? Object.keys(data.val()).map((i) => {
                    let element = data.val()[i];
                    element.id = i;
                    return element;
                }) : [];
                this.products = dataR;
                this.emitProduct();
            }
            );
    }

    getShoppingCard() {
        this.productsshoppingCard = this.localStorageService.getLocalStorageProductCard();
        this.emitShoppingCard();
    }

    addToShoppingCard(product: Product){
        this.localStorageService.storeOnLocalStorageProductCard(product);
        this.getShoppingCard();
    }

    deleteProductCard(){
        this.localStorageService.deleteProductCard();
        this.getShoppingCard();
    }

    deleteOneProductCard(id: string){
        this.localStorageService.deleteOneProductCard(id);
        this.getShoppingCard();
    }

    updateCountProduct(count: number,id: string){
        this.localStorageService.updateCountProduct(count,id);
        this.getShoppingCard();
    }

    getSingleProduct(id: number) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products/' + id).once('value').then(
                    (data) => {
                        resolve(data.val());
                    }, (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    createNewProduct(newProduct: Product) {
        firebase.database().ref('/products').push(newProduct)
            .then(() => {
                console.log("%c createNewBook => ", "color:yellow", newProduct);
            })
    }

    removeProduct(product: Product) {
        if (product.photo) {
            const storageRef = firebase.storage().refFromURL(product.photo);
            storageRef.delete().then(
                () => {
                    console.log("%c Photo removed!  ", "color:yellow");
                },
                (error) => {
                    console.log("%c Photo removed error ", "color:red", error);
                }
            );
        }
        firebase.database().ref('/products/' + product.id ).remove().then(
            () =>{
                console.log("%c products removed! ", "color:yellow", product);
                this.emitProduct();
            },
            (error) => {
                console.log("%c products removed error  ", "color:red", error);
            }
        );
        //console.log(product.id);
    }

    uploadFile(file: File) {
        return new Promise(
            (resolve, reject) => {
                const almostUniqueFileName = Date.now().toString();
                const upload = firebase.storage().ref()
                    .child('images/products/' + almostUniqueFileName + file.name).put(file);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log("%c Chargement… ", "color:yellow");
                    },
                    (error) => {
                        console.log("%c Erreur Chargement… ", "color:yellow", error);
                        reject();
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
    }





}