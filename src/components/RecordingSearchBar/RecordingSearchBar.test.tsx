import { fireEvent, render, screen, } from '@testing-library/react'
import { expect, describe, it, vi, } from 'vitest';
import RecordingSearchBar from './RecordingSearchBar';
import userEvent from '@testing-library/user-event'

const SUGGESTIONS_MOCK = [
  {
    id: '123',
    title: 'el mapale',
  },
  {
    id: '13',
    title: 'california dreaming',
  }
];

describe(('RecordingSearchBar Component'), () => {
  const onChangeMock = vi.fn()
  const onSearchMock = vi.fn()

  it('should show suggestions and send selected', async () => {
    //arrange
    render(
      <RecordingSearchBar
        value=""
        onChange={onChangeMock}
        onSearch={onSearchMock}
        suggestions={SUGGESTIONS_MOCK}
      />)

    const input = screen.getByRole('combobox');
    //act
    fireEvent.click(input);
    userEvent.type(input, 'cali')
    const selected = await screen.findByText('california dreaming');
    fireEvent.click(selected);
    //assert
    expect(onSearchMock).toHaveBeenCalledWith('california dreaming');
  })
})
