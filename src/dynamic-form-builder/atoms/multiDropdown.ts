import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldsFunctionalityService } from 'src/app/fields-functionality.service';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
    selector: 'multidropdown',
    template: `
      <div [formGroup]="form">
        <ng-select [items]="field.options" bindLabel="key" bindValue="label"
        [id]="field.name" [formControlName]="field.name"
        (keydown)="this.fieldService.validateFieldRecapture(field, form)"
        [multiple]="true" #fieldCapture
        style="width: 100%" placeholder="Asignar rol"></ng-select>
      </div>`
})
export class MultiDropDownComponent implements AfterViewInit {
    @Input() field: any = {};
    @Input() form: FormGroup;

    @ViewChild('fieldCapture') vc: NgSelectComponent;

    ngAfterViewInit() {
      this.vc.filterInput.nativeElement.focus();
    }
    constructor(public fieldService: FieldsFunctionalityService) {
    }
}