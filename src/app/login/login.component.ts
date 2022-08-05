import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User = {
    _id: "",
    userName: "",
    password: ""
  };

  warning: string = "";
  loading: boolean = false;

  loginPostSub: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    console.log("On login's submit");
    if (this.user.userName != "" && this.user.password != "") {
      this.loading = true;
      this.loginPostSub = this.authService.login(this.user).subscribe(
        (result) => {
          this.loading = false;
          console.log("result.body: " + JSON.stringify(result.body));
          localStorage.setItem('access_token',result.body.token);
          this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        })
    }
  }

  ngOnDestroy(): void {
    this.loginPostSub?.unsubscribe();
  }

}
