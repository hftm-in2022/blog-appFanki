import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../core/auth/auth.service'; // Pfad anpassen
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockAuthService {
  isAuthenticated$ = of(false);
  userName$ = of('Test User');
  login = jasmine.createSpy('login');
  logout = jasmine.createSpy('logout');
}

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent, // Standalone-Komponente importieren
        HttpClientTestingModule,
        MatSidenavModule,
        MatToolbarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: ActivatedRoute, useValue: {} }, // Mock für ActivatedRoute hinzufügen
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
