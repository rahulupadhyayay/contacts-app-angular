export interface Contact {
  iContactId: number;
  strFirstName: string;
  strLastName: string;
  strEmail: string;
}

export interface IContactState {
  contacts: Contact[];
}
