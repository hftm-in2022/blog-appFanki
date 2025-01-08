import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Für die Formularfunktionalität
import { CommonModule } from '@angular/common'; // Für grundlegende Angular-Direktiven
import { MatFormFieldModule } from '@angular/material/form-field'; // Für Material FormField
import { MatInputModule } from '@angular/material/input'; // Für Material Input
import { MatButtonModule } from '@angular/material/button'; // Für Buttons
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Für den Ladeindikator
import { LoginPageComponent } from './login-page.component'; // Import der Standalone-Komponente

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent, // Direkt zuweisen
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Lazy Loading
    ReactiveFormsModule, // Für Formulare
    MatFormFieldModule, // Angular Material FormField
    MatInputModule, // Angular Material Input
    MatButtonModule, // Angular Material Buttons
    MatProgressSpinnerModule, // Angular Material Spinner
  ],
})
export class LoginPageModule {}
