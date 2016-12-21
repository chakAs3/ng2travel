/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelService } from './travel.service';

describe('TravelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelServiceService]
    });
  });

  it('should ...', inject([TravelServiceService], (service: TravelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
