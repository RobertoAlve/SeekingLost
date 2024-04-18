import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() value: string = "";
  @Input() inputType?: string;
  @Input() inputName: string = "default-input";
  @Input() iconName: string = "";
  @Input() width: string = "628px";
  @Input() height: string = " 68px";
}
