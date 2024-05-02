import { fireEvent, render, screen, } from '@testing-library/react'
import RecordingDetail from './RecordingDetail'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, describe, it, } from 'vitest';
import { server } from '@/api/musicBrainzMockHandler';

describe(('RecordingDetail Component'), () => {

  beforeAll(() => { server.listen({ onUnhandledRequest: 'error' }) })

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  it('should show detail info', async () => {
    //arrange
    render(
      <MemoryRouter initialEntries={["/song/123"]}>
        <Routes>
          <Route path="/song/:id" element={<RecordingDetail />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('recording title');
    //asert
    expect(screen.queryByText('loading')).toBeNull();
  })

  it('should add style when save new favorite', async () => {
    //arrange
    render(
      <MemoryRouter initialEntries={["/song/123"]}>
        <Routes>
          <Route path="/song/:id" element={<RecordingDetail />} />
        </Routes>
      </MemoryRouter>
    );
    //act
    fireEvent.click(await screen.findByText('♥️'))
    //assert
    expect(screen.getByText('♥️').className).toContain('favorited')
  })

})
