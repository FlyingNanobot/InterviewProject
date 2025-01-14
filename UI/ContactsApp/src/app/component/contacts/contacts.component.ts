import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contacts.service';
import { SharedService } from '../../services/shared.service';
import { Contact } from '../../model/contact.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private contactsService: ContactsService, private modalService: NgbModal, 
    public sharedService: SharedService, private dialog: MatDialog) {
    this.searchForm = this.fb.group({
      searchText: ['']
    });
  }

  ngOnInit(): void {
    this.getContacts();
    this.searchTextControl.valueChanges.subscribe(text => this.searchContacts(text));
  }

  getContacts(): void {
    this.contactsService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
      this.filteredContacts = contacts;
      this.sharedService.setContacts(contacts);
    });
  }

  openAddEditContact(contact: Contact | null = null): void {
    const modalRef = this.modalService.open(AddEditContactComponent);
    modalRef.componentInstance.contactData = contact;
    modalRef.componentInstance.contactUpdated.subscribe(() => {
      this.getContacts();
      modalRef.close();
    });
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent,
      { data: { id: id } });
    dialogRef.afterClosed().subscribe(result => {
      if
        (result) {
          this.contactsService.deleteContact(id).subscribe(() => this.getContacts());
      }
    });
  }

  searchContacts(searchText: string): void {
    this.filteredContacts = this.contacts.filter(contact =>
      (contact.firstName?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (contact.lastName?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (contact.email?.toLowerCase().includes(searchText.toLowerCase()) ?? false)
    );
  }

  get searchTextControl(): FormControl {
    return this.searchForm.get('searchText') as FormControl;
  }
}
