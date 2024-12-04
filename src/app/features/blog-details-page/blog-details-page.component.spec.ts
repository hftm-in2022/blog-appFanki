import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogDetailsPageComponent } from './blog-details-page.component';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../interfaces/blog';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import für HttpClientTestingModule
import { StateStore } from '../../state/state-store'; // StateStore importieren

describe('BlogDetailsPageComponent', () => {
  let component: BlogDetailsPageComponent;
  let fixture: ComponentFixture<BlogDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogDetailsPageComponent,
        HttpClientTestingModule, // HttpClientTestingModule hinzufügen
      ],
      providers: [
        StateStore, // StateStore bereitstellen
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' }, // ID als Routen-Parameter bereitstellen
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDetailsPageComponent);
    component = fixture.componentInstance;

    // Manuelles Setzen der Blogs im StateStore
    const stateStore = TestBed.inject(StateStore);
    stateStore.loadBlogs([
      {
        id: 1,
        title: 'Test Blog',
        author: 'Author Name',
        contentPreview: 'Preview content',
        likes: 10,
        comments: 5,
        headerImageUrl: 'https://example.com/image.jpg',
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        likedByMe: false,
        createdByMe: true,
      } as Blog,
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load blog data based on route params', () => {
    expect(component.blog).toBeTruthy();
    expect(component.blog?.id).toBe(1);
    expect(component.blog?.title).toBe('Test Blog');
    expect(component.blog?.author).toBe('Author Name');
  });

  it('should show undefined blog if no matching ID is found', () => {
    const stateStore = TestBed.inject(StateStore);
    stateStore.loadBlogs([]); // Keine Blogs im Store

    fixture = TestBed.createComponent(BlogDetailsPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component.blog).toBeUndefined();
  });
});
