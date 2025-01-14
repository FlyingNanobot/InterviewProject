import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactsService } from './services/contacts.service';
import { SharedService } from './services/shared.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDeleteComponent } from './component/confirm-delete/confirm-delete.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { AddEditContactComponent } from './component/add-edit-contact/add-edit-contact.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppComponent,
    AddEditContactComponent,
    ContactsComponent,
    ConfirmDeleteComponent
  ],
  providers: [
    ContactsService,
    SharedService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: []
})
export class AppModule { }
