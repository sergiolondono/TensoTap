import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from "@angular/core";
import { DocumentsService } from "../documents.service";
import { LoginService } from "../login.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "app-indexacion",
  templateUrl: "./indexacion.component.html",
  styleUrls: ["./indexacion.component.css"]
})
export class IndexacionComponent implements OnInit {
  document;
  image;
  converted_image;
  unsubcribe: any;
  public fields: any[];
  public form: FormGroup;

  constructor(
    private documentService: DocumentsService,
    private route: ActivatedRoute,
    private login: LoginService
  ) {    
    this.getDocuments();
  }

  title = "ImageViewerApp";

  ngOnInit() {
  }

  descartarDocumento() {
    //if (confirm("Desea descartar el documento?")) { 
      this.form.reset();    
      this.getDocuments();
      
      // this.form.markAsPristine();
      // this.form.markAsUntouched();
    //}
  }

  guardarCaptura(f){
    console.log("Form Submitted");
    this.form.reset(); 
    this.getDocuments();
  }

  getDocuments() {
    this.document = "";
    this.documentService.getDocuments().subscribe((data: {}) => {
      this.document = data;

      this.fields = this.document.fieldForm;

      this.form = new FormGroup({
        fields: new FormControl(JSON.stringify(this.fields))
      });
      this.unsubcribe = this.form.valueChanges.subscribe(update => {
        this.fields = JSON.parse(update.fields);
      });

      this.image = this.document.imageProccess.imageBytes;
      this.converted_image = "data:image/jpeg;base64," + this.image;
    });
  }

  getDocument() {
    this.document = "";
    this.documentService.getDocument(3).subscribe((data: {}) => {
      this.document = data;
      this.fields = this.document.fieldForm;
      this.image = this.document.imageProccess.imageBytes;
      this.converted_image = "data:image/jpeg;base64," + this.image;
    });
  }

  displayform(f) {
    console.log(f);
  }

}
