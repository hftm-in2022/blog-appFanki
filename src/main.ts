import {
  enableProdMode,
  importProvidersFrom,
  ErrorHandler,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { correlationIdInterceptor } from './app/interceptors/correlation-id.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandlerService } from './app/services/global-error.service';
import { provideAuth } from 'angular-auth-oidc-client'; // Neuer Import für die Authentifizierung
import { authConfig } from './app/auth/auth.config'; // Neuer Import für die Authentifizierung
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import der neuen Authentifizierungskonfiguration

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Routing konfigurieren
    importProvidersFrom(
      HttpClientModule, // HTTP-Client-Modul
      BrowserAnimationsModule, // Animationen
      MatSnackBarModule, // Material Snackbar-Modul
    ),
    provideHttpClient(withInterceptors([correlationIdInterceptor])), // HTTP-Interceptor hinzufügen
    provideAuth({ config: authConfig }), // Authentifizierungskonfiguration übergeben
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }, // Globaler Error-Handler
    provideAnimationsAsync(), // Animationen
  ],
}).catch((err) => console.error('Application bootstrapping failed:', err));
