import { Component, inject } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  imports: [DatePipe],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
})
export class Notes {
  readonly service = inject(NoteService);
}
