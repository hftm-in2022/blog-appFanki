import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export function titleExistsValidator(blogService: BlogService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value;

    if (!value || typeof value !== 'string') {
      // Wenn kein gültiger Wert eingegeben ist, gibt es keinen Fehler
      return of(null);
    }

    return blogService.checkTitleExists(value).pipe(
      map((exists) => (exists ? { titleExists: true } : null)), // Fehler, falls Titel existiert
      catchError((error) => {
        console.error('Fehler beim Überprüfen des Titels:', error);
        return of(null); // Keine Fehler bei API-Problemen
      }),
    );
  };
}
