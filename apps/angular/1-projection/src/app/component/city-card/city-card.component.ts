import { Component, OnInit, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [items]="cities"
      (addItem)="handleAddItem()"
      customClass="btn-light-blue">
      <img src="assets/img/city.png" width="200px" />
      <ng-template [appCardRow]="cities" let-city>
        <app-list-item (deleteItem)="handleDeleteItem(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .btn-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities: City[] = [];

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  handleAddItem(): void {
    this.store.addOne(randomCity());
  }

  handleDeleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
