import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'; // Import für MatNavList
import { MatButtonModule } from '@angular/material/button'; // Import für Buttons
import { MatIconModule } from '@angular/material/icon'; // Import für Icons
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule, // Hinzufügen für MatNavList
    MatButtonModule, // Hinzufügen für Buttons
    MatIconModule, // Hinzufügen für Icons
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private breakpointObserver = inject(BreakpointObserver);
  authService: AuthService = inject(AuthService);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
