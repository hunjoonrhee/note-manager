import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function noProfanityValidator(forbidden: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // 1. control.value가 falsy면 (빈 값) → null 리턴 (required validator가 처리할 일)
    const value = control.value;
    if (!value) return null;

    const lowerValue = value.toLowerCase();
    const found = forbidden.find((word) => lowerValue.includes(word));

    return found ? { profanityError: found } : null;
  };
}
