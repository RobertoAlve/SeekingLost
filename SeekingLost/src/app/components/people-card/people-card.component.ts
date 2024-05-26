import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image-service/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrl: './people-card.component.scss'
})
export class PeopleCardComponent {
  @Input() peopleName: String = "Default"
  @Input() isNewCard: boolean = false;
  @Input() peopleToken: String = "";
  imagePath: String[] = [""];
  backgroundColor: string = "#515151";

  constructor(private imageService: ImageService, private router: Router) { }

  ngOnInit() {
    if (this.isNewCard) {
      this.peopleName = "Novo";
      this.imagePath = [""];
    } else {
      this.imageService.getFirstImage(this.peopleToken).subscribe({
        next: (data: any) => {
          console.log(data)
          this.imagePath = data.uris;
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

}
