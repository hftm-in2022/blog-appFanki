import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { appConfig } from './app/app.config';
import { HttpClientModule } from '@angular/common/http'; // Importiere HttpClientModule

if (environment) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    importProvidersFrom(HttpClientModule), // Hier HttpClientModule hinzufügen
  ],
}).catch((err) => console.error(err));
