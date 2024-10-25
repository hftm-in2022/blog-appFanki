import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Für ngModel
import { MatInputModule } from '@angular/material/input'; // Für matInput
import { MatFormFieldModule } from '@angular/material/form-field'; // Für mat-form-field
import { MatButtonModule } from '@angular/material/button'; // Für mat-raised-button
import { CommonModule } from '@angular/common'; // Für ngSwitch und ngClass

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule, // Füge CommonModule hinzu
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  template: `
    <!-- Angular Material FormField with 2-way binding (NgModel) -->
    <mat-form-field appearance="fill">
      <mat-label>Enter your name</mat-label>
      <input matInput [(ngModel)]="name" />
    </mat-form-field>

    <p>Your name is: {{ name }}</p>

    <!-- Button with (click) event -->
    <button mat-raised-button color="primary" (click)="onButtonClick()">
      Submit
    </button>

    <!-- Toggle visibility with *ngIf -->
    <button mat-raised-button color="accent" (click)="toggleVisibility()">
      Toggle Visibility
    </button>
    <div *ngIf="isVisible">
      This is conditionally visible based on isVisible!
    </div>

    <!-- ngSwitch demonstration -->
    <div [ngSwitch]="color">
      <p *ngSwitchCase="'red'">Red Color</p>
      <p *ngSwitchCase="'blue'">Blue Color</p>
      <p *ngSwitchDefault>Other Color</p>
    </div>

    <button mat-raised-button (click)="changeColor('red')">Red</button>
    <button mat-raised-button (click)="changeColor('blue')">Blue</button>
    <button mat-raised-button (click)="changeColor('green')">Green</button>

    <!-- ngFor demonstration -->
    <ul>
      <li *ngFor="let item of items">{{ item }}</li>
    </ul>

    <!-- NgClass demonstration -->
    <div [ngClass]="{ 'red-text': isRed, 'blue-text': !isRed }">
      This text changes class based on isRed!
    </div>
    <button mat-raised-button (click)="isRed = !isRed">
      Toggle Color Class
    </button>

    <!-- NgStyle demonstration -->
    <div [ngStyle]="{ 'font-size': fontSize + 'px' }">
      This text changes its size dynamically!
    </div>
    <button mat-raised-button (click)="fontSize = fontSize + 1">
      Increase Font Size
    </button>
    <button mat-raised-button (click)="fontSize = fontSize - 1">
      Decrease Font Size
    </button>
  `,
  styleUrls: ['./demo.component.scss'], // Falls du Styles hast
})
export class DemoComponent {
  name = '';
  isVisible = false;
  color = 'red'; // Standardfarbe
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  isRed = true; // Typannotationen sind hier nicht notwendig, wenn sie einfach sind
  fontSize = 16;

  onButtonClick() {
    console.log('Button clicked!');
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  changeColor(newColor: string) {
    this.color = newColor;
  }
}
