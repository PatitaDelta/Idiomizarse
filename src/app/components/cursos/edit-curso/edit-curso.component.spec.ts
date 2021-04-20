import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCursoComponent } from './edit-curso.component';

describe('EditCursoComponent', () => {
  let component: EditCursoComponent;
  let fixture: ComponentFixture<EditCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
