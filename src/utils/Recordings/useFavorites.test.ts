import { renderHook } from '@testing-library/react';
import useFavorites from './useFavorites';
import { expect, vi, describe, it } from 'vitest';
import * as useLocalStorageHooks from '../LocalStorage'

const RECORDING_MOCK = {
  id: '123', title: 'recording-title',
  artists: [{
    id: 'artist1',
    name: 'name1'
  }]
}

describe('useFavorite', () => {
  describe('saveNewFavorite', () => {
    it('should save new favorite recording', () => {
      // arrange
      const useLocalStorageSpy = vi.spyOn(useLocalStorageHooks, 'useLocalStorage');
      const saveMock = vi.fn()
      useLocalStorageSpy.mockReturnValue([[], saveMock]);
      const { result } = renderHook(() => useFavorites());
      // act
      result.current.saveNewFavorite(RECORDING_MOCK);
      // assert
      expect(saveMock.mock.lastCall).toMatchInlineSnapshot(`
        [
          [
            {
              "artists": [
                {
                  "id": "artist1",
                  "name": "name1",
                },
              ],
              "id": "123",
              "isFavorite": true,
              "title": "recording-title",
            },
          ],
        ]
      `)

    });

    it('should unsave favorite recording', () => {
      // arrange
      const useLocalStorageSpy = vi.spyOn(useLocalStorageHooks, 'useLocalStorage');
      const saveMock = vi.fn()
      useLocalStorageSpy.mockReturnValue([[RECORDING_MOCK], saveMock]);
      const { result } = renderHook(() => useFavorites());
      // act
      result.current.saveNewFavorite({ ...RECORDING_MOCK, isFavorite: true });
      // assert
      expect(saveMock.mock.lastCall).toMatchInlineSnapshot(`
        [
          [],
        ]
      `)
    });
  });
});