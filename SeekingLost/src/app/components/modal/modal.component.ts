import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() type: string = "danger";  
  @Output() toggleModal: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onClose();
    }, 3000);
  }

  onClose() {
    this.toggleModal.emit();
    this.bsModalRef.hide();
  }

}
