import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: unknown): void {
    console.error('Global Error:', error);

    // Anzeigen einer Snackbar für Benutzer
    this.snackBar.open(
      'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      'Schließen',
      {
        duration: 5000,
      },
    );
  }
}
