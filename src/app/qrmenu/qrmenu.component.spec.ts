import { ComponentFixture, TestBed } from '@angular/core/testing';
import {QrmenuComponent} from "./qrmenu.component";


describe('QrmenuComponent', () => {
  let component: QrmenuComponent;
  let fixture: ComponentFixture<QrmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrmenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
