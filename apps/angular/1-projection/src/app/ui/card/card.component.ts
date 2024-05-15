import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>
      <section>
        @for (item of items; track item.id) {
          <ng-container
            [ngTemplateOutlet]="cardRowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="handleAddItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  @Input() items: T[] = [];
  @Input() customClass = '';

  @Output() addItem: EventEmitter<void> = new EventEmitter();

  @ContentChild(CardRowDirective, { read: TemplateRef })
  cardRowTemplate!: TemplateRef<{ $implicit: T }>;

  handleAddItem(): void {
    this.addItem.emit();
  }
}
