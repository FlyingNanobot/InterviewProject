import { Injectable } from '@angular/core';
import { Contact } from '../model/contact.model';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private contacts: Contact[] = [];

    constructor() { }

    getContacts(): Contact[] {
        return this.contacts;
    }

    setContacts(contacts: Contact[]): void {
        this.contacts = contacts;
    }
}
