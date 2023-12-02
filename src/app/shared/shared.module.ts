import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe/safe-url.pipe';

@NgModule({
  declarations: [SafeUrlPipe],
  imports: [CommonModule],
  exports: [SafeUrlPipe],
})
export class SharedModule {}
