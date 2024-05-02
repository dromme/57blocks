import { Label, Input, ComboBox, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import styles from './RecordingSearchBar.module.scss';
import { useEffect, useState } from 'react';
import useThrottle from '@custom-react-hooks/use-throttle';

interface RecordingSearchBarProps {
  value: string;
  onSearch: (value: string) => {};
  onChange: (value: string) => {};
  suggestions: Recording[];
}

const RecordingSearchBar = ({ value, onChange, onSearch, suggestions = [] }: RecordingSearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);
  const throttledValue = useThrottle(inputValue, 700);

  useEffect(() => {
    if (throttledValue) {
      onChange(throttledValue);
    }
  }, [throttledValue])

  return (
    <ComboBox
      allowsCustomValue
      inputValue={inputValue}
      className={styles.searchBox}
      onKeyDown={(e) => e.key === 'Enter' && onSearch(inputValue)}
      onInputChange={setInputValue}
    >
      <Label className={styles.label}>Search your favorite music</Label>
      <Input />
      <Popover className={styles.suggestionBox}>
        <ListBox>
          {suggestions.map((suggestion: Recording) =>
            <ListBoxItem
              textValue={suggestion.title}
              className={styles.suggestionItem}
              key={suggestion.id}>
              <span onClick={() => onSearch(suggestion.title)}>
                {suggestion.title}
              </span>
            </ListBoxItem>)}
        </ListBox>
      </Popover>
    </ComboBox >
  );
}

export default RecordingSearchBar;
