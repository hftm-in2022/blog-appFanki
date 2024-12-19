import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let mockOidcSecurityService: Partial<OidcSecurityService>;

  beforeEach(async () => {
    mockOidcSecurityService = {
      isAuthenticated$: of({
        isAuthenticated: true,
        allConfigsAuthenticated: [
          { configId: 'mockConfig', isAuthenticated: true },
        ],
      }),
      getPayloadFromIdToken: jasmine
        .createSpy('getPayloadFromIdToken')
        .and.returnValue({ roles: ['user'] }),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule], // AppComponent in imports aufnehmen
      providers: [
        { provide: OidcSecurityService, useValue: mockOidcSecurityService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
