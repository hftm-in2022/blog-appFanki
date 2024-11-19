import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogDetailsPageComponent } from './blog-details-page.component';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../interfaces/blog';

describe('BlogDetailsPageComponent', () => {
  let component: BlogDetailsPageComponent;
  let fixture: ComponentFixture<BlogDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailsPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                blog: {
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
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load blog data from resolver', () => {
    expect(component.blog).toBeTruthy();
    expect(component.blog?.title).toBe('Test Blog');
    expect(component.blog?.author).toBe('Author Name');
  });
});
