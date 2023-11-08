import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];

    const fullUrl = `https://www.youtube.com/embed/` + lastPart;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }
}
