import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: BsModalService) { }

  openAlertModal(title: string, message: string, type: 'success' | 'danger' | 'warning' = 'success'): void {
    this.modalService.show(ModalComponent, {
      initialState: {
        title,
        message,
        type
      }
    });
  }
}
