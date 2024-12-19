import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: true,
})
export class RegisterPageComponent {
  username = ''; // Der Typ wird automatisch als 'string' abgeleitet
  password = ''; // Der Typ wird automatisch als 'string' abgeleitet
  registrationError: string | null = null; // Der Typ 'string | null' bleibt notwendig
  registrationSuccess = false; // Der Typ 'boolean' wird automatisch abgeleitet

  register(): void {
    if (!this.username || !this.password) {
      this.registrationError = 'Bitte Benutzername und Passwort eingeben.';
      return;
    }

    // Simulierte Registrierung (hier später durch eine tatsächliche API-Anfrage ersetzen)
    console.log('Registrierung erfolgreich:', {
      username: this.username,
      password: this.password,
    });

    this.registrationError = null;
    this.registrationSuccess = true;

    // Weiterleitung zur Login-Seite nach erfolgreicher Registrierung
    setTimeout(() => {
      this.registrationSuccess = false;
      this.navigateToLogin();
    }, 2000);
  }

  navigateToLogin(): void {
    // Navigiert zur Login-Seite
    window.location.href = '/login';
  }
}
