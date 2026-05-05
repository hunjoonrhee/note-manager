import { Component, inject } from '@angular/core';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCard {
  readonly service = inject(NoteService);
}
