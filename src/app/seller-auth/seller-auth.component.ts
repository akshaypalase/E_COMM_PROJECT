import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { SignUp, login } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false;
  authError:string='';
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  //signup form data
  signUp(data: SignUp): void {
    this.seller.signUp(data)
  }                    

  Login(data: login): void {
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
       if(isError){
        this.authError='email or password is not valid';
       }
    })
  }                                                                  

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }

}
