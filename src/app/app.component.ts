/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Xavier Lozano Student ID: 129091187 Date: August 5th 2022
*
********************************************************************************/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'web422-a4';
  searchString :string = "";

  //Part 6
  token: any;
  routerEventPostSub : any;

  constructor(private router: Router, private authService: AuthService){}
  handleSearch(event:any){
    let searchQuery: String = event.target.elements.searchString.value;
    console.log("searchQuery is: "+searchQuery);
    event.target.elements.searchString.value = "";
    this.router.navigate(['/search'],{queryParams: {q:searchQuery}});
  }

  logout(): void{
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.routerEventPostSub = this.router.events.subscribe((event: Event)=>{
      if(event instanceof NavigationStart){
        this.token = this.authService.readToken();
      }
    })
  }

  ngOnDestroy(): void {
    this.routerEventPostSub?.unsubscribe();
  }
}
