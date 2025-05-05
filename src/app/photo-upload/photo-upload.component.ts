import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css'],
})
export class PhotoUploadComponent {
  @Output() imageUploaded = new EventEmitter<File>();
  photo: File | null = null;

  constructor(private messageService: MessageService) {}

  onFileSelected(event: any) {
    this.photo = event.target.files ? event.target.files[0] : null;
  }

  onSubmit() {
    if (!this.photo) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Алдаа',
        detail: 'Зураг сонгоно уу.',
      });
      return;
    }
    this.imageUploaded.emit(this.photo);
  }
}
