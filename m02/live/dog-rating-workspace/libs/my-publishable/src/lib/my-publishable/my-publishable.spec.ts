import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPublishable } from './my-publishable';

describe('MyPublishable', () => {
  let component: MyPublishable;
  let fixture: ComponentFixture<MyPublishable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPublishable],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPublishable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
