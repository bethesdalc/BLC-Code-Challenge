import { DateValidators } from '../shared/date.validator';
import { FormControl } from '@angular/forms';

describe('DateValidators', () => {
    const minDate = new Date(2020, 3, 12, 8, 30);
    const dateValidator = DateValidators.dateValidate(minDate);
    const control = new FormControl('date');

    it('should be created', () => {
        expect(dateValidator).toBeTruthy();
    });

    it('should return null if entered date time is after the min date', () => {
        var enteredDate = new Date(2020, 3, 12, 9, 30);
        control.setValue(enteredDate);
        expect(dateValidator(control)).toBeNull();
    });

    it('should return true if entered date time is equal the min date', () => {
        var enteredDate = new Date(2020, 3, 12, 8, 30);
        control.setValue(enteredDate);
        expect(dateValidator(control)).toEqual({ dateValidate: true });
    });

    it('should return true if entered date time is less the min date', () => {
        var enteredDate = new Date(2020, 3, 12, 7, 30);
        control.setValue(enteredDate);
        expect(dateValidator(control)).toEqual({ dateValidate: true });
    });
});
