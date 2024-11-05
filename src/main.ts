import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { correlationIdInterceptor } from './app/interceptors/correlation-id.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import für BrowserAnimationsModule

if (environment) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule), // HttpClientModule und BrowserAnimationsModule importieren
    provideHttpClient(withInterceptors([correlationIdInterceptor])), // Interceptor registrieren
  ],
}).catch((err) => console.error(err));
