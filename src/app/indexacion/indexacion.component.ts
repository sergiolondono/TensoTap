import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../documents.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-indexacion',
  templateUrl: './indexacion.component.html',
  styleUrls: ['./indexacion.component.css']
})
export class IndexacionComponent implements OnInit {

  document;

  constructor(
    private rest: DocumentsService,
    private route: ActivatedRoute,
    private login: LoginService) {
      this.login.GuardarLote();
     }

  title = "ImageViewerApp";
  
  image =  "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  ngOnInit() {
    this.getDocuments();    
  }

  getDocuments() {
    this.document = "";
    this.rest.getDocuments().subscribe((data: {}) => {
      console.log(data);
      this.document = data;
    });
  }
}

