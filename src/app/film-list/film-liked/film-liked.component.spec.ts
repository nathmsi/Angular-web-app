import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmLikedComponent } from './film-liked.component';

describe('FilmLikedComponent', () => {
  let component: FilmLikedComponent;
  let fixture: ComponentFixture<FilmLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
