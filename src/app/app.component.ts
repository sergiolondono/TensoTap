import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './services/documents.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  date;

  constructor(private auth: AuthService, router: Router) {
    if(this.auth.isAuthenticated())
    {
      let returnUrl = localStorage.getItem('returnUrl');
      router.navigateByUrl(returnUrl);
    }    
   }

  ngOnInit() {
    this.date = (new Date()).getFullYear();
  }
}
