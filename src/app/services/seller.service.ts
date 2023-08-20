import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError= new EventEmitter<boolean>(false)
  url = 'http://localhost:3000/seller';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: SignUp) {
    this.http.post(this.url,
      data,
      { observe: 'response' }).subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      })
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: login) {
  this.http.get(`http://localhost:3000/seller?email=${data.email}& password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
               console.log(result);
               if(result && result.body  && result.body.length===1){
                this.isLoginError.emit(false)
               localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']) 
               }
               else{
                console.warn('login failed');
                this.isLoginError.emit(true)
                
               }        
  })


  }
}
