import { Component } from '@angular/core';
import { StateService } from './state.service';
import { State } from './state.model';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']//,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private locationId: number;
  location: any;

  constructor(
    private stateService: StateService,
    private locationService: LocationService) { }

  ngOnInit() {
    this.stateService.state$.subscribe(state => {
      if (this.locationId != state.locationId) {
        this.locationId = state.locationId;
        this.locationService.get(state.locationId).subscribe(location => {
          console.log(location);
          this.location = location;
        });
      }
    });
    // Imitation of user logging in.
    let playerId = prompt('name');
    this.stateService.authorize(playerId);
  }

  title = 'Type Realm';
  get state$(): Observable<State> {
    return this.stateService.state$;
  }

  enterRoad(roadId: number): void {
    this.stateService.enterRoad(roadId);
  }

  enterLocation(locationId: number): void {
    this.stateService.enterLocation(locationId);
  }

  move(distance: number): void {
    this.stateService.move(distance);
  }

  turnAround(): void {
    this.stateService.turnAround();
  }
}
