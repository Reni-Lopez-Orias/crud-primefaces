import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelErrorComponent } from './label-error/label-error.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CardNotUserComponent } from './card-not-user/card-not-user.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableComponent } from './table/table.component';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [
    LabelErrorComponent,
    ToolbarComponent,
    CardNotUserComponent,
    FormComponent,
    TableComponent,
    SpinnerComponent
  ],
  exports: [
    LabelErrorComponent,
    ToolbarComponent,
    CardNotUserComponent,
    FormComponent,
    TableComponent,
    SpinnerComponent,
    //this module used in app-component
    ConfirmPopupModule,
    ToastModule,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    CardModule,
    DialogModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    BadgeModule,
    ProgressSpinnerModule,
    ConfirmPopupModule,
    ToastModule,
    InputTextModule,
    SliderModule
  ],
})
export class ComponentsModule { }
