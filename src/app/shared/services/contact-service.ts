import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiInterfaceServices } from "./api-interface-service";
import { Contact } from '../models/contact-model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class contactService {

  constructor(private apiService: ApiInterfaceServices) {

  }

  getcontactsList(): Observable<Contact[]> {
    return this.apiService.get('Contacts/All');
  }

  createupdatecontact(contact: any): Observable<Object> {
    return this.apiService.post('Contacts/CreateUpdate', contact);
  }

  getcontactById(id: number): Observable<Contact> {
    return this.apiService.get(`Contacts/Detail/${id}`);
  }

  deletecontact(id: number): Observable<Object> {
    return this.apiService.delete(`Contacts/delete/${id}`);
  }

}
