import { Component, Input } from '@angular/core';
import { ButtonColor } from '../../class/ButtonColor';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonText?: string = "Default";
  @Input() buttonColor?: string = "#FFF";
  @Input() textColor?: string = "#FFF";
  availableColors: ButtonColor[] = []

  constructor() { }

  ngOnInit() {
    this.availableColors.push(new ButtonColor("green", "#6CDB7E"))
    this.availableColors.push(new ButtonColor("red", "#F44E38"))
    this.availableColors.push(new ButtonColor("purple", "#7B6CDB"))

    this.getButtonColor();
  }

  private getButtonColor() {
    this.availableColors.forEach(color => {
      if (this.buttonColor == color.name) {
        this.buttonColor = color.value;
      }
    })
  }

}
