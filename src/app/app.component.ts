import { Component, OnInit } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'chefs-talks';

  img!: CloudinaryImage;

  ngOnInit() {
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'demo',
      },
    });
  }
}
