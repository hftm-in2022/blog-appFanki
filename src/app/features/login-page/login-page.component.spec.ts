import { TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let mockOidcSecurityService: Partial<OidcSecurityService>;

  beforeEach(async () => {
    mockOidcSecurityService = {
      isAuthenticated$: of({
        isAuthenticated: true,
        allConfigsAuthenticated: [
          { configId: 'mockConfig', isAuthenticated: true },
        ],
      }),
      authorize: jasmine.createSpy('authorize'),
    };

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, HttpClientModule], // LoginPageComponent in imports aufnehmen
      providers: [
        { provide: OidcSecurityService, useValue: mockOidcSecurityService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
