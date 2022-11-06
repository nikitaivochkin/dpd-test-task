import React, { ChangeEvent } from 'react';
import { buildURL } from 'utils';

import './styles.scss';

type SearchProps = {
  value: string,
  // eslint-disable-next-line no-unused-vars
  setValue: (e: string) => void,
};

const Search: React.FC<SearchProps> = ({ value, setValue }: SearchProps) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    buildURL({ search: e.target.value });
  };

  return (
    <div className="table-search">
      <label htmlFor="search">
        Find user
        <input
          type="text"
          name="search"
          id="search"
          value={value}
          onChange={handleInput}
        />
      </label>
    </div>
  );
};

export default Search;
