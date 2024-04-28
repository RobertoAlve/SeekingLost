import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrl: './people-card.component.scss'
})
export class PeopleCardComponent {
  @Input() peopleName: String = "Default"
  @Input() isNewCard: boolean = false;
  @Input() peopleToken: String = "";
  imagePath: String = "";
  backgroundColor: string = "#EDEDED";

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    if (this.isNewCard) {
      this.peopleName = "Novo";
      this.imagePath = "";
    } else {
      this.imageService.getFirstImage(this.peopleToken).subscribe({
        next: (data: any) => {
          this.imagePath = data.uri;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

}
