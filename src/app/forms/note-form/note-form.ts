import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/note-service';
import { noProfanityValidator } from '../../validators/no-profanity';

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.html',
  styleUrl: './note-form.scss',
})
export class NoteForm {
  readonly service = inject(NoteService);
  readonly formGroup = new FormGroup({
    title: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        noProfanityValidator(['스팸', 'spam', '광고']),
      ],
      nonNullable: true,
    }),
    content: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  onSubmit() {
    console.log(this.formGroup.value);
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // 모든 필드를 touched로 만들어 에러 메시지 표시
      return;
    }
    const { title, content } = this.formGroup.getRawValue();
    this.service.addNote({ title, content });
    this.formGroup.reset();
  }
}
