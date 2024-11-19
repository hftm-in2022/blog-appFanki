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

if (environment) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      MatSnackBarModule,
    ),
    provideHttpClient(withInterceptors([correlationIdInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
}).catch((err) => console.error(err));
