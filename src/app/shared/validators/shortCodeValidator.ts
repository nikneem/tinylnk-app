// import { Injectable } from '@angular/core';
// import {
//   AbstractControl,
//   AsyncValidator,
//   AsyncValidatorFn,
//   ValidationErrors,
// } from '@angular/forms';
// import { BehaviorSubject, Observable, catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
// import { ShortlinkService } from 'src/app/services/shortlink.service';

// export class IsShortCodeUniqueValidator {
//   static createValidator(
//     shortLinksService: ShortlinkService
//   ): AsyncValidatorFn {
//     console.log('Static factory call');
//     const subject = new BehaviorSubject<string>('');
//     const debouncedInput$ = subject.asObservable().pipe(
//       distinctUntilChanged(),
//       debounceTime(1000),
//       switchMap((id) =>
//       shortLinksService
//           .isUnique(id, '')
//           .pipe(
//             map<boolean, ValidationErrors>((isUserIdFree) =>
//               !isUserIdFree ? { isUserIdFree: `${id} is taken` } : null
//             )
//           )
//       )
//     );
//     return (control: AbstractControl): Observable<ValidationErrors> => {
//       console.log('Inner AsyncValidator call');
//       subject.next(control.value);
//       return debouncedInput$;
//     };
//   }
// }
