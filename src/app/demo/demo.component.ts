import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <!-- Eingabefeld mit Mat-Form -->
      <mat-form-field appearance="fill" class="input-field">
        <mat-label>Enter your name</mat-label>
        <input matInput [(ngModel)]="name" />
      </mat-form-field>
      <p>Your name is: {{ name }}</p>

      <!-- Benachrichtigung -->
      <div *ngIf="submitCount > 0" class="notification">
        Message submitted {{ submitCount }} times
      </div>

      <!-- Button für Submit -->
      <button
        mat-raised-button
        color="primary"
        (click)="onButtonClick()"
        class="button"
      >
        Submit
      </button>

      <!-- Sichtbarkeit umschalten -->
      <button
        mat-raised-button
        color="accent"
        (click)="toggleVisibility()"
        class="button"
      >
        Toggle Visibility
      </button>
      <div *ngIf="isVisible" class="visibility-box">
        This is conditionally visible based on isVisible!
      </div>

      <!-- Farbwahl und ngSwitch -->
      <div [ngSwitch]="color" class="color-display">
        <p *ngSwitchCase="'red'">Red Color</p>
        <p *ngSwitchCase="'blue'">Blue Color</p>
        <p *ngSwitchDefault>Other Color</p>
      </div>

      <!-- Farbbuttons -->
      <button
        mat-raised-button
        (click)="changeColor('red')"
        class="button red-button"
      >
        Red
      </button>
      <button
        mat-raised-button
        (click)="changeColor('blue')"
        class="button blue-button"
      >
        Blue
      </button>
      <button
        mat-raised-button
        (click)="changeColor('green')"
        class="button green-button"
      >
        Green
      </button>

      <!-- Itemliste mit dynamischer Farbe -->
      <ul [ngStyle]="{ color: color }" class="item-list">
        <li *ngFor="let item of items">{{ item }}</li>
      </ul>

      <!-- Klasse umschalten -->
      <div
        [ngClass]="{ 'red-text': isRed, 'blue-text': !isRed }"
        class="toggle-text"
      >
        This text changes class based on isRed!
      </div>
      <button mat-raised-button (click)="isRed = !isRed" class="button">
        Toggle Color Class
      </button>

      <!-- Schriftgröße -->
      <div [ngStyle]="{ 'font-size': fontSize + 'px' }" class="dynamic-text">
        This text changes its size dynamically!
      </div>
      <button
        mat-raised-button
        (click)="fontSize = fontSize + 2"
        class="button"
      >
        Increase Font Size
      </button>
      <button
        mat-raised-button
        (click)="fontSize = fontSize - 1"
        class="button"
      >
        Decrease Font Size
      </button>
    </div>
  `,
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  name = '';
  isVisible = false;
  color = 'red';
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  isRed = true;
  fontSize = 16;
  submitCount = 0;

  onButtonClick() {
    this.submitCount += 1;
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  changeColor(newColor: string) {
    this.color = newColor;
  }
}
