import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
const MUSIC_BRAINZ_URL = 'https://musicbrainz.org/ws/2/'

const RECORDING_API_MOCK = {
  id: '123',
  title: 'recording title',
  'artist-credit': [{
    name: 'name1',
    artist: {
      id: 'artist1',
    }
  },
  {
    name: 'name second',
    artist: {
      id: 'artist2',
    }
  }]
};

export const restHandlers = [
  http.get(`${MUSIC_BRAINZ_URL}recording/*`, () => {
    return HttpResponse.json(RECORDING_API_MOCK)
  }),
];

export const server = setupServer(...restHandlers)

