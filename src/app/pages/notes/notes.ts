import { Component, computed, inject, signal } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { RelativeTimePipe } from '../../pipes/relative-time-pipe';
import { NoteForm } from '../../forms/note-form/note-form';
import { NoteSearch } from '../../forms/note-search/note-search';

@Component({
  selector: 'app-notes',
  imports: [RelativeTimePipe, NoteForm, NoteSearch],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
})
export class Notes {
  readonly service = inject(NoteService);
  readonly searchTerm = signal('');

  readonly sortedNotes = computed(() => {
    const notes = this.service.notes();

    return [...notes].sort((a, b) => {
      if (a.favorite !== b.favorite) {
        return a.favorite ? -1 : 1;
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
  });

  readonly filteredNotes = computed(() => {
    const searchTerm = this.searchTerm().toLowerCase();
    const currentNotes = this.sortedNotes();
    console.log(searchTerm);

    if (!searchTerm) return currentNotes;
    return currentNotes.filter(
      (note) => note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm),
    );
  });
}
