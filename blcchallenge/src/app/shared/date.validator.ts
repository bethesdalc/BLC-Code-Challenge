import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isDate } from 'util';

export class DateValidators {

  static dateValidate(minDate: Date): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {

      var enteredDate = new Date(c.value);
      var checkDate = new Date(minDate);

      if (c.value && (isDate(c.value) || enteredDate <= checkDate)) {
        return { dateValidate: true };
      }
      return null;
    };
  }
}