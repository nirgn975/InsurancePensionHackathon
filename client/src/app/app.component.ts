import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router
  ){}

  ngOnInit(){
    let accessToken = window.localStorage.getItem('access token');
    if(accessToken){
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  title = 'app works!';
  
  

}
