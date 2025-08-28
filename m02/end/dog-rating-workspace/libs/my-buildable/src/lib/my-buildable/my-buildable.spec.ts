import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBuildable } from './my-buildable';

describe('MyBuildable', () => {
  let component: MyBuildable;
  let fixture: ComponentFixture<MyBuildable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBuildable],
    }).compileComponents();

    fixture = TestBed.createComponent(MyBuildable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
