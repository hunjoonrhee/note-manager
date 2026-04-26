import { computed, Injectable, signal } from '@angular/core';
import { Note } from '../models/note';
import { v4 as uuidv4 } from 'uuid';

const SEED_NOTES: Note[] = [
  {
    id: uuidv4(),
    title: 'Angular L3 시험 준비',
    content: 'Signals, RxJS, Forms, DI, Lifecycle 5개 카드 복습하기. 5월 시험 목표.',
    favorite: true,
    createdAt: new Date('2026-04-10T09:00:00'),
  },
  {
    id: uuidv4(),
    title: 'CPACC 모의고사 결과',
    content: 'Probeklausur 1: 38/50. 약점은 Section 3 (Standards). 다시 정리 필요.',
    favorite: true,
    createdAt: new Date('2026-04-12T14:30:00'),
  },
  {
    id: uuidv4(),
    title: '장보기',
    content: '우유, 계란, 빵, 토마토, 바질',
    favorite: false,
    createdAt: new Date('2026-04-20T18:15:00'),
  },
  {
    id: uuidv4(),
    title: 'PR 리뷰 체크리스트',
    content: '1) 테스트 통과? 2) 타입 any 없음? 3) console.log 제거? 4) 커밋 메시지 컨벤션?',
    favorite: true,
    createdAt: new Date('2026-04-15T10:45:00'),
  },
  {
    id: uuidv4(),
    title: 'Victor Mono 폰트 후기',
    content: '이탤릭이 cursive라 코드에서 키워드가 손글씨처럼 보임. 마음에 듦.',
    favorite: false,
    createdAt: new Date('2026-04-18T22:10:00'),
  },
  {
    id: uuidv4(),
    title: '독일어 단어 정리',
    content: 'Steuererklärung(세금 신고), Anmeldung(거주 등록), Krankenkasse(건강보험)',
    favorite: false,
    createdAt: new Date('2026-04-05T16:00:00'),
  },
  {
    id: uuidv4(),
    title: 'TypeScript: interface vs type',
    content: '객체는 interface, union/primitive/mapped는 type. Angular는 interface 컨벤션.',
    favorite: true,
    createdAt: new Date('2026-04-23T11:30:00'),
  },
  {
    id: uuidv4(),
    title: '주말 계획',
    content: '토요일: 조깅 + 카페에서 코딩. 일요일: 가족과 통화, 빨래.',
    favorite: false,
    createdAt: new Date('2026-04-22T20:00:00'),
  },
  {
    id: uuidv4(),
    title: '면접 질문 정리',
    content: 'OnPush 전략, ChangeDetectorRef.markForCheck(), trackBy 함수, defer block 활용',
    favorite: false,
    createdAt: new Date('2026-04-08T13:20:00'),
  },
  {
    id: uuidv4(),
    title: '책 추천',
    content: '"Refactoring" by Martin Fowler. 2판 읽는 중. 챕터 6까지 완료.',
    favorite: false,
    createdAt: new Date('2026-04-01T19:45:00'),
  },
];

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly _notes = signal<Note[]>(SEED_NOTES);
  readonly notes = this._notes.asReadonly();

  readonly favoriteCount = computed(() => {
    const notes = this.notes();
    return notes.filter((note) => note.favorite).length;
  });

  readonly noteCount = computed(() => {
    const notes = this.notes();
    return notes.length;
  });

  addNote(newNoteData: { title: string; content: string }) {
    const newNote: Note = {
      ...newNoteData,
      id: uuidv4(),
      createdAt: new Date(),
      favorite: false,
    };

    this._notes.update((notes) => [...notes, newNote]);
  }

  removeNote(id: string) {
    this._notes.update((notes) => notes.filter((note) => note.id !== id));
  }

  updateNote(id: string, patch: Partial<Pick<Note, 'title' | 'content'>>) {
    const note = this.notes().find((note) => note.id === id);

    if (!note) {
      console.error('note not found');
      return;
    }

    const title = patch.title ? patch.title : note.title;
    const content = patch.content ? patch.content : note.content;

    const updatedNote: Note = {
      ...note,
      title,
      content,
    };

    this._notes.update((notes) => notes.map((note) => (note.id === id ? updatedNote : note)));
  }

  toggleFavorite(id: string) {
    const note = this.notes().find((note) => note.id === id);

    if (!note) {
      console.error('note not found');
      return;
    }

    this._notes.update((notes) =>
      notes.map((note) => (note.id === id ? { ...note, favorite: !note.favorite } : note)),
    );
  }
}
