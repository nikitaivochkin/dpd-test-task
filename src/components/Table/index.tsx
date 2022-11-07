import React, { useState, useLayoutEffect } from 'react';
import chunk from 'lodash.chunk';
import pick from 'lodash.pick';

import { TableColumn } from 'types';

import { buildURL } from 'utils';

import THead from './Head';
import TBody from './Body';
import Pagination, { Settings } from './Pagination';
import Search from './Search';

import './styles.scss';

type TableProps = {
  columns: Array<TableColumn>,
  data: Array<any>
  // eslint-disable-next-line no-unused-vars
  pagination: { perPage: number } | false,
};

const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  pagination = false,
}: TableProps) => {
  const defaultPerPage = 10;
  const defaultSettings: Settings = {
    current: 1,
    perPage: typeof pagination === 'boolean' ? defaultPerPage : pagination.perPage,
  };

  const [settings, setSetting] = useState<Settings>(defaultSettings);
  const [searchValue, setSearchValue] = useState('');

  const filtredData = data.filter(({ name }) => name.includes(searchValue));
  const chunkedData = chunk(filtredData, settings.perPage);
  const currentChunk = chunkedData[settings.current - 1] ?? [];

  useLayoutEffect(() => {
    const { location: { search } } = window;
    const urlParams = new URLSearchParams(search.substr(1));

    const serchParams = pick(Object.fromEntries(urlParams), ['search', 'current']);

    setSearchValue(serchParams.search || '');
    setSetting({ ...settings, current: Number(serchParams.current) || defaultSettings.current });
  }, []);

  const handleSearch = (v: string) => {
    setSetting({ ...settings, current: 1 });
    setSearchValue(v);

    buildURL({ current: String(defaultSettings.current) });
  };

  const changePagination = (newSettings: Settings) => {
    setSetting(newSettings);
    buildURL({ current: String(newSettings.current) });
  };

  return (
    <>
      <Search
        value={searchValue}
        setValue={handleSearch}
      />
      <div className="users-table">
        <table>
          <THead columns={columns} />
          <TBody
            data={currentChunk}
            columns={columns}
          />
        </table>
      </div>

      {
        pagination && chunkedData.length > 1 && (
          <Pagination
            settings={settings}
            chunks={chunkedData.length}
            onChange={changePagination}
          />
        )
      }
    </>
  );
};

export default Table;
