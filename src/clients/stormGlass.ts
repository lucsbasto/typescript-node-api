import { AxiosStatic } from 'axios';

export class StormGlass {
  constructor(protected request: AxiosStatic) {}
  readonly stormGlassAPIParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassAPISource = 'noaa';
  protected key =
    '421e519e-e64b-11ea-be2e-0242ac130002-421e5306-e64b-11ea-be2e-0242ac130002';

  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    return this.request.get(
      `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&end=1592113802&lat=${lat}&lng=${lng}`,
      { headers: { Authorization: this.key } }
    );
  }
}
