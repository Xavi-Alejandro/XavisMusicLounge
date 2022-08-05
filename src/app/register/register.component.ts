import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerUser: RegisterUser = {
    userName: "",
    password: "",
    password2: ""
  };
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;

  registerPostSub: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }
  onSubmit(f: NgForm): void {
    console.log("On register's submit");
    if (this.registerUser.userName != "" && this.registerUser.password != "" && this.registerUser.password2 != "") {

      this.loading = true;
      console.log(JSON.stringify(this.registerUser));
      this.registerPostSub = this.authService.register(this.registerUser).subscribe(
        (result) => {
          console.log("Result from registration attempt: " + result);
            this.success = true;
            this.warning = "";
            this.loading = false;  
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.registerPostSub?.unsubscribe();
  }

}
