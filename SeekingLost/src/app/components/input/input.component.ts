import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent {
  value: string = "";
  
  @Input() inputType?: string;
  @Input() inputName: string = "default-input";
  @Input() iconName: string = "";
  @Input() width: string = "628px";
  @Input() height: string = " 68px";
  
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() { }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  updateValue(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouch();
  }
}
