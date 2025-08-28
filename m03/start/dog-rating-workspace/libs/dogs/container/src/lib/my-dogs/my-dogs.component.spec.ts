import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyDogsComponent } from './my-dogs.component';

describe('MyDoggComponent', () => {
  let component: MyDogsComponent;
  let fixture: ComponentFixture<MyDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDogsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
