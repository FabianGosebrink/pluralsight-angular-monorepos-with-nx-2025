import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainDogComponent } from './main-dog.component';

describe('MainDogComponent', () => {
  let component: MainDogComponent;
  let fixture: ComponentFixture<MainDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
