import React from 'react';
import { TableColumn } from 'types';
import THead from './Head';
import TBody from './Body';
import Pagination, { PaginationProps } from './Pagination';

import './styles.scss';

type TableProps = {
  columns: Array<TableColumn>,
  data: Array<any>
  pagination?: false | PaginationProps,
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  pagination = false,
}: TableProps) => (
  <>
    <table className="my-table">
      <THead columns={columns} />
      <TBody data={data} columns={columns} />
    </table>
    {
      pagination && (
        <Pagination
          total={data.length}
        />
      )
    }
  </>
);

export default Table;
