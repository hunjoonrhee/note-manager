import { Component, computed, inject } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { RelativeTimePipe } from '../../pipes/relative-time-pipe';
import { NoteForm } from '../../forms/note-form/note-form';

@Component({
  selector: 'app-notes',
  imports: [RelativeTimePipe, NoteForm],
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
