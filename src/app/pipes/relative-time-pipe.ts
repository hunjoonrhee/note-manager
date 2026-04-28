import { Pipe, PipeTransform } from '@angular/core';

const SECOND = 1;
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date().getTime();
    const target = new Date(value).getTime();
    const diffMs = now - target;
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < MINUTE) return '방금 전';
    if (diffSec < HOUR) return `${Math.floor(diffSec / MINUTE)}분 전`;
    if (diffSec < DAY) return `${Math.floor(diffSec / HOUR)}시간 전`;
    if (diffSec < WEEK) return `${Math.floor(diffSec / DAY)}일 전`;
    if (diffSec < MONTH) return `${Math.floor(diffSec / WEEK)}주 전`;
    if (diffSec < YEAR) return `${Math.floor(diffSec / MONTH)}달 전`;
    return `${Math.floor(diffSec / YEAR)}년 전`;
  }
}
