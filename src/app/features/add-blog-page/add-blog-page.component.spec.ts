import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddBlogPageComponent } from './add-blog-page.component';

describe('AddBlogPageComponent', () => {
  let component: AddBlogPageComponent;
  let fixture: ComponentFixture<AddBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogPageComponent, BrowserAnimationsModule], // `BrowserAnimationsModule` nur hier verwenden
    }).compileComponents();

    fixture = TestBed.createComponent(AddBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
