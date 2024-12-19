import { TestBed } from '@angular/core/testing';
import { BlogOverviewPageComponent } from './blog-overview-page.component';
import { BlogService } from '../../services/blog.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('BlogOverviewPageComponent', () => {
  let mockBlogService: Partial<BlogService>;

  beforeEach(async () => {
    mockBlogService = {
      getBlogs: jasmine.createSpy('getBlogs').and.returnValue(
        of({
          data: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10,
          maxPageSize: 10,
        }),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [BlogOverviewPageComponent, HttpClientModule], // BlogOverviewPageComponent in imports aufnehmen
      providers: [{ provide: BlogService, useValue: mockBlogService }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BlogOverviewPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
