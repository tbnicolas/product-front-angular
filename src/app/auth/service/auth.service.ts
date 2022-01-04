import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterface } from '../pages/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario!: AuthInterface;

  private baseUrl: string =  environment.baseUrl;

  get usuario ():AuthInterface {
    return {...this._usuario};
  }

  constructor( private http:HttpClient ) { }
/* .pipe(catchError( err => of([]))); */
  public login(email:string, password:string):Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }/auth/`,{email,password})
              .pipe(
                tap(
                  resp => {
                      if( resp.ok ) {
                        localStorage.setItem('token',resp.token);
                        this._usuario = {
                          ok: resp.ok,
                          email: resp.email,
                          token: resp.token
                        }
                      }
                    }
                 ),
                 map( resp => resp.ok),
                 catchError( err => of(err.error.msg) )
               );
  }


}
