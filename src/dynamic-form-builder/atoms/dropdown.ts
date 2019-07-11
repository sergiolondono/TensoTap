import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldsFunctionalityService } from 'src/app/fields-functionality.service';

@Component({
    selector: 'dropdown',
    template: `
      <div [formGroup]="form">
        <select autofocus="autofocus" autofocus="autofocus" class="form-control form-control-sm" [id]="field.name" [formControlName]="field.name"
        (keydown)="this.fieldService.validateFieldRecapture(field, form)">
          <option *ngFor="let opt of field.options" [value]="opt.key">{{opt.label}}</option>
        </select>
      </div> 
    `
})
export class DropDownComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;

    constructor(public fieldService: FieldsFunctionalityService) {

    }
}