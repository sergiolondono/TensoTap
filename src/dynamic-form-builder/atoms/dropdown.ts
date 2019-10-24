import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldsFunctionalityService } from 'src/app/fields-functionality.service';

@Component({
    selector: 'dropdown',
    template: `
      <div [formGroup]="form">
        <select #fieldCapture class="form-control form-control-sm" [id]="field.name" [formControlName]="field.name"
        (keydown)="this.fieldService.validateFieldRecapture(field, form)">
          <option *ngFor="let opt of field.options" [value]="opt.key">{{opt.label}}</option>
        </select>
      </div> 
    `
})
export class DropDownComponent implements AfterViewInit {
    @Input() field:any = {};
    @Input() form:FormGroup;

    @ViewChild('fieldCapture', {read: false}) vc: any;

    ngAfterViewInit() {
       this.vc.nativeElement.focus();
    }
    
    constructor(public fieldService: FieldsFunctionalityService) {

    }
}