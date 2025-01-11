import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddEditContactComponent } from './add-edit-contact/add-edit-contact.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactsService } from './services/contacts.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    AppComponent,
    ContactsComponent,
    AddEditContactComponent,
    ConfirmDeleteComponent,
    FormsModule
  ],
  providers: [
    ContactsService,
    SharedService
  ],
  bootstrap: []
})
export class AppModule { }
