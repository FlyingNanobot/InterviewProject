import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'https://localhost:44351/api/Contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

  updateContact(id: any, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
