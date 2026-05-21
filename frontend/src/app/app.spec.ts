import { TestBed } from '@angular/core/testing';
import { App } from './app'; // Cambiado a 'App' para que coincida con tu archivo app.ts

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], // Cambiado a 'App'
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App); // Cambiado a 'App'
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App); // Cambiado a 'App'
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend');
  });
});