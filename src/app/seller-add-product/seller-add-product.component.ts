import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
    addProductMessage: string | undefined;
   constructor(private prouct:ProductService){}

  submit(data :product){
        this.prouct.addProduct(data).subscribe((res)=>{
             console.warn(res); 
             if(res){
              this.addProductMessage='product is added'
             }
        })

      setTimeout(()=>{
        this.addProductMessage=undefined;
      },3000)       
      
  }

}
