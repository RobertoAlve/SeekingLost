import { Component, Input, Output } from '@angular/core';
import { ButtonColor } from '../../class/ButtonColor';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Output() buttonClicked: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() buttonText?: string = "Default";
  @Input() buttonColor?: string = "#FFF";
  @Input() textColor?: string = "#FFF";
  @Input() buttonType?: string = ""
  @Input() isDisabled?: boolean = false;
  @Input() idButton?: string = "idDefault";
  availableColors: ButtonColor[] = []

  constructor() { }

  ngOnInit() {
    this.availableColors.push(new ButtonColor("green", "#6CDB7E"))
    this.availableColors.push(new ButtonColor("red", "#F44E38"))
    this.availableColors.push(new ButtonColor("purple", "#7B6CDB"))

    this.getButtonColor();
  }

  onClick() {
    this.buttonClicked.emit({"id": this.idButton});
  }

  private getButtonColor() {
    this.availableColors.forEach(color => {
      if (this.buttonColor == color.name) {
        this.buttonColor = color.value;
      }
    })
  }

}
