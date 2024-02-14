import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export function telValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!/^(\+32|0)\d{1,2}\d{3}\d{2}\d{2}$/.test(value)) {
        return {tel: "This is not a valid phone number"};
    }
    return null;
    }
}