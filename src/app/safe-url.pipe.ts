import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    const fullUrl = `https://www.youtube.com/embed/` + url;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }
}
