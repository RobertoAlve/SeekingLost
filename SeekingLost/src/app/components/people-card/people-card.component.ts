import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrl: './people-card.component.scss'
})
export class PeopleCardComponent {
  @Input() peopleName: string = "Default"
  @Input() imagePath: string = "";
  @Input() isNewCard: boolean = false;
  backgroundColor: string = "#EDEDED";

  constructor() { }

  ngOnInit() {
    if (this.isNewCard) {
      this.peopleName = "Novo";
    }
  }

}
