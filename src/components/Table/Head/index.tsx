import React, { memo } from 'react';
import { TableColumn } from 'types';

type ThreadProps = {
  columns: Array<TableColumn>,
};

const THead: React.FC<ThreadProps> = memo(({ columns }: ThreadProps) => (
  <thead>
    <tr>
      {
        columns.map(({ name, key, type }) => (
          <th
            key={key}
            className={`cell cell_${type}`}
          >
            { name }
          </th>
        ))
      }
    </tr>
  </thead>
));

export default THead;
