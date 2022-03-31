import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const matModules = [
  ReactiveFormsModule,
  HttpClientModule,
  MatTabsModule,
  FormsModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatFormFieldModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    matModules
  ],
  exports: matModules
})
export class MaterialModule { }
