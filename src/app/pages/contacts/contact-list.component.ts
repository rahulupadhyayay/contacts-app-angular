import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Contact } from '../../shared/models/contact-model';
import { contactService } from '../../shared/services/contact-service'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/task.reducer';
import { deleteTask, setTask } from '../../shared/task.actions';
import { Observable } from 'rxjs';

@Component({
  //  standalone:true,
  selector: 'app-contact-managment',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactComponent implements OnInit {
  isAddContact: boolean = false;
  editVal: any;
  contacts: Contact[] = [];
  contactObj: object;
  taskContact$: Observable<Contact[]>;
  visible: boolean = false;
  totalRecords = 0;


  columns: any[] = [
    {
      name: "Id",
      field: "iContactId",
    },
    {
      name: "First Name",
      field: "strFirstName",
    },
    {
      name: "Last Name",
      field: "strLastName",
    },
    {
      name: "Email",
      field: "strEmail",
    },
  ];
  @ViewChild('dt1') dt1: Table | any;
  deleteId: any;
  constructor(private contactService: contactService, private commonService: CommonService,
    private router: Router, private store: Store<AppState>) {
    this.taskContact$ = this.store.select('tasks');
    this.contactObj = this.store.select('tasks');
  }

  ngOnInit(): void {
    this.isAddContact = false;
    this.getcontacts();
  }

  private getcontacts() {
    this.contactService.getcontactsList().subscribe((res: any) => {
      if (res.isSuccess) {
        this.contacts = res.result;
      }
      else {
        this.contacts = [];
      }
    })
  }

  createcontact() {
    this.router.navigate(['addEditContact']);
  }

  deletecontact() {
    this.contactService.deletecontact(this.deleteId).subscribe((res: any) => {
      if (res.isSuccess) {
        this.commonService.showSuccessToaster('', res.message)
        this.getcontacts();
        this.visible = false;
      }
      else {
        this.commonService.showErrorToaster('', res.message);
        this.visible = false
      }
    });
  }
  deleteTask(id: number) {
    this.visible = false;
    this.commonService.showSuccessToaster('', 'Contact deleted successfully.')
    this.store.dispatch(deleteTask({ id }));
  }
  openDialog(id: any) {
    this.deleteId = id;
    this.visible = true;
  }
  updatecontact(contact: any) {
    this.isAddContact = true;

    this.editVal = Object.assign({}, contact);
  }
  cancelCon() {
    this.visible = false;
  }
  saveStatus(cStatus: any) {
    this.isAddContact = false;

    if (cStatus == true) {

      this.getcontacts();
    }
    else {
      this.isAddContact = false;
    }
  }
  CancelEvent(event: any) {
    console.log(event);
    if (event == true) {
      this.isAddContact = false;
    }
  }
  changeColor(id:any){
    
  }
}
