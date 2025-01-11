import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../model/contact.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class AddEditContactComponent {
  contact: Contact = new Contact(0, '', '', '');
  emailError: string | null = null;

  constructor(public dialogRef: MatDialogRef<AddEditContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactsService: ContactsService, public sharedService: SharedService) {
    if (data) {
      this.contact = { ...data };
    }
  }

  onSubmit(form: any): void {
    const data = this.sharedService.getContacts();

    const isDuplicateEmail = data.some(contact => contact.email === this.contact.email && contact.id !== this.contact.id);

    if (isDuplicateEmail) {
      this.emailError = 'Duplicate email address found. Please use a different email.';
      return;
    } else {
      this.emailError = null;
    }

    if (this.data) {
      this.contactsService.updateContact(this.contact.id, this.contact).subscribe(() => this.dialogRef.close());
    } else {
      let newId = 1;
      if (data.length > 0) {
        const lastId = data[data.length - 1].id;
        newId = isNaN(lastId) ? 1 : lastId + 1;
      }

      this.contact.id = newId;

      this.contactsService.addContact(this.contact).subscribe(() => this.dialogRef.close());
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
