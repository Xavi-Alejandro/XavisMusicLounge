import { Injectable } from '@angular/core';

//Part 6
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate():boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
