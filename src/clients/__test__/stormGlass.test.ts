import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json';
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_weather_3_hours.json';

jest.mock('axios');

describe('StormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  it('should return the normalized forecast from the StormGlass service', async () => {
    const lat = -33.784515;
    const lng = 151.254841;
    mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HoursFixture });
    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual(stormGlassNormalized3HoursFixture);
  });

  it('should exclude incomplete data points', async () => {
    const lat = -33.784515;
    const lng = 151.254841;
    const incompleteResponse = {
      hours: [
        {
          windDirection: {
            noaa: 191.92,
          },
          time: '2020-08-24T02:00:00+00:00',
        },
      ],
    };
    mockedAxios.get.mockResolvedValue({ data: incompleteResponse });
    const stormGlass = new StormGlass(mockedAxios);
    const response = await stormGlass.fetchPoints(lat, lng);
    expect(response).toEqual([]);
  });

  it('should get a generic error from StormGlass service when the request failt before reaching the service', async () => {
    const lat = -33.784515;
    const lng = 151.254841;

    mockedAxios.get.mockRejectedValue({ message: 'Network Error' });
    const stormGlass = new StormGlass(mockedAxios);

    await expect(stormGlass.fetchPoints(lat, lng)).rejects.toThrow(
      'Unexpected error when trying to communicate to StormGlass: Network Error'
    );
  });
});
