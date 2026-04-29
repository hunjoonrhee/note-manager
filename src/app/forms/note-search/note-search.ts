import { Component, effect, model, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-note-search',
  imports: [ReactiveFormsModule],
  templateUrl: './note-search.html',
  styleUrl: './note-search.scss',
})
export class NoteSearch {
  readonly searchControl = new FormControl<string>('', { nonNullable: true });
  readonly searchTerm = model<string>('');

  // readonly searchTerm = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()), {
  //   initialValue: '',
  // });

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        map((v) => v.trim()),
        filter((v) => v.length === 0 || v.length >= 2),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((value) => {
        this.searchTerm.set(value);
        // const trimmed = value.trim();
        // if (trimmed.length === 0 || trimmed.length >= 2) {
        //   this.searchTerm.set(trimmed);
        // }
      });

    effect(() => {
      const newValue = this.searchTerm();
      if (newValue !== this.searchControl.value) {
        this.searchControl.setValue(newValue, { emitEvent: false });
      }
    });
  }
}
