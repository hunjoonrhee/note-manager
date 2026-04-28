import { Component, computed, inject } from '@angular/core';
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

  readonly sortedNotes = computed(() => {
    const notes = this.service.notes();

    return notes.sort((a, b) => {
      if (a.favorite !== b.favorite) {
        return a.favorite ? -1 : 1;
      } else {
        return b.createdAt.getDate() - a.createdAt.getDate();
      }
    });
  });
}
