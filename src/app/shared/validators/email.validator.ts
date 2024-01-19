import { FormControl } from '@angular/forms';

/**
 * The purpose of this validator is to ensure that the email is valid using the regex pattern.
 * Invalidates "sample", "sample@" and "sample@sample" email inputs.
 *
 * @param control - Form control to be checked.
 */
export function emailValidator(control: FormControl) {
  // make sure that we validate email only if it exists (related to 'required' and other validators being used)
  if (control && control.value) {
    const isValidEmail =
      /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
        control.value
      );
    return isValidEmail ? null : { invalidEmail: true };
  }
  return null;
}
