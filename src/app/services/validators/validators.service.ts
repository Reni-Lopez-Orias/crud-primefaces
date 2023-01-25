import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  requiredInput(name: string) {
    return (control: FormControl) => {
      const value = control.value?.trim();
      if (control.dirty) {
        if (!value || value == '') {
          return {
            requiredInput: `The ${name} is required`
          };
        }
      }
      return null;
    };
  }

  email(control: FormControl) { 
    const value = control.value;
    let regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (control.dirty) { 
      if (!regex.test(value)) { 
        return {
          email: `The Email is not valid`
        };
      }
    }
    return null; 
  }

  minLength(length: number, label: string) {
    return (control: FormControl) => {
      const value = control.value;
      if (control.dirty) {
        if (value.length < length) {
          return {
            minLength: `The ${label} must have ${length} character`
          };
        }
      }
      return null;
    };
  }


}
