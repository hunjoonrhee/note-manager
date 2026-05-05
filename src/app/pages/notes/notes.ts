import { Component, computed, inject, signal } from '@angular/core';
import { StatsCard } from '../../components/stats-card/stats-card';
import { NoteForm } from '../../forms/note-form/note-form';
import { NoteSearch } from '../../forms/note-search/note-search';
import { RelativeTimePipe } from '../../pipes/relative-time-pipe';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-notes',
  imports: [RelativeTimePipe, NoteForm, NoteSearch, StatsCard],
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

    if (!searchTerm) return currentNotes;
    return currentNotes.filter(
      (note) => note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm),
    );
  });
}
