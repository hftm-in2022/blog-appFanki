import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export function titleExistsValidator(blogService: BlogService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      // Wenn kein Titel eingegeben ist, gibt es keinen Fehler
      return of(null);
    }
    return blogService.checkTitleExists(control.value).pipe(
      map((exists) => (exists ? { titleExists: true } : null)), // Fehler, falls Titel existiert
      catchError(() => of(null)), // Keine Fehler bei API-Problemen
    );
  };
}
