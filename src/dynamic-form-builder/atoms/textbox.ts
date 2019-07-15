import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldsFunctionalityService } from 'src/app/fields-functionality.service';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textbox',
    template: `
      <div [formGroup]="form">
        <input #fieldCapture *ngIf="!field.multiline" autocomplete="off" [attr.type]="field.type" 
        class="form-control form-control-sm"  [id]="field.name" [name]="field.name" 
        [formControlName]="field.name" maxlength="100"
        (keydown)="this.fieldService.validateFieldRecapture(field, form)"
        oninput="this.value = this.value.toUpperCase()" placeholder="{{field.placeHolder}}">
        <textarea *ngIf="field.multiline" [class.is-invalid]="isDirty && !isValid" 
        [formControlName]="field.name" [id]="field.name"
        rows="9" class="form-control" [placeholder]="field.placeholder"></textarea>
      </div> 
    `
})
export class TextBoxComponent implements AfterViewInit {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
    
    @ViewChild('fieldCapture') vc: any;

       ngAfterViewInit() {
          this.vc.nativeElement.focus();
       }
       
    constructor(public fieldService: FieldsFunctionalityService) {      
    }

}