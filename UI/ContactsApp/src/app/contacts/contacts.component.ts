import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ContactsService } from '../services/contacts.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../model/contact.model';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchText: string = '';

  constructor(private contactsService: ContactsService, public dialog: MatDialog, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.getContacts();
    console.log(JSON.stringify(this.contacts));
  }

  getContacts(): void {
    this.contactsService.getContacts().subscribe((contacts: any) => {
      this.contacts = contacts;
      this.filteredContacts = contacts;
      this.sharedService.setContacts(contacts);
    });
  }

  openAddEditContact(contact = null): void {
    const dialogRef = this.dialog.open(AddEditContactComponent, { data: contact });
    dialogRef.afterClosed().subscribe(() => this.getContacts());
  }

  openEditContact(contact: any): void {
    this.openAddEditContact(contact);
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, { data: { id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.deleteContact(id).subscribe(() => this.getContacts());
      }
    });
  }

  searchContacts(searchInput: any): void {
    if (this.searchText.trim() === '') {
      this.filteredContacts = this.contacts;
      searchInput.classList.remove('is-invalid');
      return;
    }
  
    this.filteredContacts = this.contacts.filter(contact =>
      (contact.firstName?.toLowerCase().includes(this.searchText.toLowerCase()) ?? false) ||
      (contact.lastName?.toLowerCase().includes(this.searchText.toLowerCase()) ?? false) ||
      (contact.email?.toLowerCase().includes(this.searchText.toLowerCase()) ?? false)
    );
  
    if (this.filteredContacts.length === 0) {
      searchInput.classList.add('is-invalid');
    } else {
      searchInput.classList.remove('is-invalid');
    }
  }  
}
