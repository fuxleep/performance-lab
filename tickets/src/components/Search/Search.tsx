import {
  FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput,
} from '@mui/material';
import {
  useEffect, useState,
} from 'react';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  handleChange: (name: string, value: unknown) => void
}

export function Search({ handleChange }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleChange('search', search);
  }, [search]);

  return (
    <FormControl size="small" variant="outlined">
      <InputLabel htmlFor="search">Search</InputLabel>
      <OutlinedInput
        id="search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startAdornment={(
          <InputAdornment position="start">
            <IconButton edge="start">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
    )}
        label="Password"
      />
    </FormControl>
  );
}