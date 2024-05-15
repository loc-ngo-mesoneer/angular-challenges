import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ng-template[appCardRow]',
  standalone: true,
})
export class CardRowDirective<T> {
  @Input() appCardRow: T[] = [];

  static ngTemplateContextGuard<TContext>(
    dir: CardRowDirective<TContext>,
    ctx: unknown,
  ): ctx is { $implicit: TContext } {
    return true;
  }
}
