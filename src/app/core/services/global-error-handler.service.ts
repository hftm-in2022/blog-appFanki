import { ErrorHandler, Injectable } from '@angular/core';
//import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}
  handleError(error: Error): void {
    const message = error.message || 'Ein unerwarteter Fehler ist aufgetreten.';
    this.snackBar.open(message, 'Schliessen', {
      // macht es Sinn dem Benutzer die technische Fehlermeldung anzuzeigen?
      duration: 5000,
    });

    console.error('GlobalErrorHandler:', error);
  }
}
