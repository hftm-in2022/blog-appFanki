import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
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
        .and.returnValue({ roles: ['user'], preferred_username: 'testUser' }),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientModule], // HttpClientModule hinzugefügt
      providers: [
        { provide: OidcSecurityService, useValue: mockOidcSecurityService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
