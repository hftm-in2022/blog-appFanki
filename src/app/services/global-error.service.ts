import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone,
  ) {}

  handleError(error: unknown): void {
    let message = 'Ein unerwarteter Fehler ist aufgetreten';

    if (error instanceof HttpErrorResponse) {
      // HTTP-Fehler behandeln
      message = this.getServerErrorMessage(error);
    } else if (error instanceof Error) {
      // Client-seitige Fehler behandeln
      message = error.message;
    }

    // Fehlermeldung anzeigen
    this.zone.run(() => {
      this.snackBar.open(message, 'Schließen', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    });

    // Fehler in der Konsole oder an einen Logging-Service senden
    console.error('Global Error Handler:', error);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404:
        return `Blog nicht gefunden: ${error.message}`;
      case 403:
        return `Zugriff verweigert: ${error.message}`;
      case 500:
        return `Interner Serverfehler: ${error.message}`;
      default:
        return `Unerwarteter Fehler: ${error.message}`;
    }
  }
}
