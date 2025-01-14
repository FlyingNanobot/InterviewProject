import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contacts.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddEditContactComponent implements OnInit {
  @Input() contactData: any;
  @Output() contactUpdated = new EventEmitter<void>();
  contactForm: FormGroup;
  emailError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private sharedService: SharedService
  ) {
    this.contactForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    });
  }

  ngOnInit(): void {
    if (this.contactData) {
      this.contactForm.patchValue(this.contactData);
    }
  }

  ngOnChanges() {
    if (this.contactData) {
      this.contactForm.patchValue(this.contactData);
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const formData = this.contactForm.value;
    const data = this.sharedService.getContacts();
    const isDuplicateEmail = data.some(contact => contact.email === formData.email && contact.id !== formData.id);

    if (isDuplicateEmail) {
      this.emailError = 'Duplicate email address found. Please use a different email.';
      return;
    } else {
      this.emailError = null;
    }

    if (this.contactData) {
      this.contactsService.updateContact(formData.id, formData).subscribe(() => this.contactUpdated.emit());
    } else {
      let newId = 1;
      if (data.length > 0) {
        const lastId = data[data.length - 1].id;
        newId = isNaN(lastId) ? 1 : lastId + 1;
      }

      formData.id = newId;
      this.contactsService.addContact(formData).subscribe(() => this.contactUpdated.emit());
    }
  }

  onCancel(): void {
    this.contactUpdated.emit();
  }
}
