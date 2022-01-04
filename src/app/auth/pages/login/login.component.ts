import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal  from 'sweetalert2';


import { AuthService } from '../../service/auth.service';
import { AuthFormInterface } from '../interfaces/auth-form.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;

  public authForm: AuthFormInterface = {
    email: '',
    password:''
  }

  constructor( 
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public auth(): void{

    if( this.authForm.email.length === 0 ||
        this.authForm.password.length === 0
    ) {
      Swal.fire('Error','El correo y contraseña no pueden estar vacios', 'error');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.authForm.email, this.authForm.password)
                    .subscribe(
                      ( resp ) => {
                        if( resp === true ) {
                          console.log('OK',resp);
                          this.isLoading = false;

                          this.router.navigate(['./product']);
                        } else {
                          this.isLoading = false;
                          Swal.fire('Error',resp, 'error');
                        }
                      }
                    )
  }
  
  public enableOrDisableButton():string {
    return ( this.isLoading )
          ? 'custom-button btn-disable'
          : 'custom-button'
  }
}
