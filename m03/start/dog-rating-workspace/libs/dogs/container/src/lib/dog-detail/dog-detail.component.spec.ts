import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogDetailComponent } from './dog-detail.component';

describe('DogDetailComponent', () => {
  let component: DogDetailComponent;
  let fixture: ComponentFixture<DogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
