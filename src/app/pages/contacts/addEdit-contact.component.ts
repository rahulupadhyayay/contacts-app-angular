import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact-model';
import { contactService } from '../../shared/services/contact-service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { emailValidator } from 'src/app/shared/validators/email.validator';
import { ContactComponent } from './contact-list.component';
import { ConstantPool } from '@angular/compiler';
import { concat } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'add-edit-contact',
  templateUrl: './addEdit-contact.component.html'
})
export class AddEditContactComponent implements OnInit {

  contactForm: FormGroup;
  isSubmitted: boolean = false;
  @Input() inpcontact: any;
  @Output() status = new EventEmitter();
  @Output() cancelAddPage = new EventEmitter();
  contact: any;
  displayLabel: string = 'Add Contact';
  btnText: string = "Add"

  constructor(private fb: FormBuilder, private contactService: contactService,
    private router: Router, private common: CommonService) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
    });
    this.displayLabel = 'Add Contact';
  }

  ngOnInit() {

    console.log(this.inpcontact);

    if (this.inpcontact != null || this.inpcontact != undefined) {

      this.displayLabel = 'Edit Contact';
      this.btnText = "Edit";
      this.contact = this.inpcontact;
      this.contactForm.patchValue({
        firstName: this.contact.strFirstName,
        lastName: this.contact.strLastName,
        email: this.contact.strEmail
      });
    }
  }

  clear() {
    this.contact = null;
    this.displayLabel = 'Add Contact';
    this.status.emit(false);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.contactForm.invalid) {
      return;
    } else {
      var contactData = {
        iContactId: this.contact != null ? this.contact.iContactId : 0,
        strFirstName: this.contactForm.value.firstName,
        strLastName: this.contactForm.value.lastName,
        strEmail: this.contactForm.value.email
      };

      this.contactService.createupdatecontact(contactData).subscribe((res: any) => {
        if (res.isSuccess) {
          this.clear();
          this.common.showSuccessToaster('', res.message)
          this.status.emit(true);
          this.router.navigate(['contact']);

        }
        else {
          this.common.showErrorToaster('', res.message)
          this.status.emit(false);

        }
      });
    }

  }

  cancel() {
    this.contactForm.reset();
    this.router.navigate(['contact'])
    this.cancelAddPage.emit(true);
  }

  public errorHandling = (control: string, error: string) => {
    return this.contactForm.controls[control].hasError(error);
  };
}
