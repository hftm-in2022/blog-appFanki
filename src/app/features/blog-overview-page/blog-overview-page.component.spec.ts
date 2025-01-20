import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogOverviewPageComponent } from './blog-overview-page.component';
import { BlogOverviewCardComponent } from '../../shared/blog-overview-card/blog-overview-card.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogStore } from '../../core/stores/blog-state.store';
import { Signal, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

type BlogStoreMock = jasmine.SpyObj<{
  loadAll: jasmine.Spy;
  entries: Signal<{
    pageSize: number;
    data: {
      id: number;
      title: string;
      contentPreview: string;
      author: string;
      likes: number;
      comments: number;
      likedByMe: boolean;
      createdByMe: boolean;
    }[];
    pageIndex: number;
    totalCount: number;
    maxPageSize: number;
  }>;
  isLoadingList: Signal<boolean>;
  errorDetail: Signal<string | null>;
}>;

describe('BlogOverviewPageComponent', () => {
  let component: BlogOverviewPageComponent;
  let fixture: ComponentFixture<BlogOverviewPageComponent>;
  let mockBlogStore: BlogStoreMock;

  const mockEntries = signal({
    pageSize: 10,
    data: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Blog Title ${i + 1}`,
      contentPreview: `Preview for Blog ${i + 1}`,
      author: `Author ${i + 1}`,
      likes: i * 2,
      comments: i + 1,
      likedByMe: i % 2 === 0,
      createdByMe: i % 2 === 0,
    })),
    pageIndex: 1,
    totalCount: 20,
    maxPageSize: 10,
  });

  const mockIsLoadingList = signal(false);
  const mockErrorDetail = signal<string | null>(null);

  beforeEach(async () => {
    mockBlogStore = jasmine.createSpyObj('BlogStore', {
      loadAll: jasmine.createSpy(),
      entries: mockEntries,
      isLoadingList: mockIsLoadingList,
      errorDetail: mockErrorDetail,
    });

    await TestBed.configureTestingModule({
      imports: [
        BlogOverviewPageComponent,
        CommonModule,
        RouterTestingModule,
        MatProgressSpinnerModule,
        BlogOverviewCardComponent,
      ],
      providers: [{ provide: BlogStore, useValue: mockBlogStore }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load all blogs on initialization', () => {
    expect(mockBlogStore.loadAll).toHaveBeenCalled();
  });

  it('should display the correct number of blog cards', () => {
    fixture.detectChanges();
    const blogCards = fixture.debugElement.queryAll(
      By.css('app-blog-overview-card'),
    );
    console.log(blogCards);
    expect(10).toBe(mockEntries().data.length);
  });

  it('should display the loading spinner when loading', () => {
    mockIsLoadingList.set(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should paginate blogs correctly', () => {
    const initialCount = component.paginatedBlogs.length;
    expect(initialCount).toBe(0);

    component.loadMoreBlogs();
    fixture.detectChanges();

    expect(component.paginatedBlogs.length).toBe(0);
  });
});
