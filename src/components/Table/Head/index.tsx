import React, { memo } from 'react';
import { TableColumn } from 'types';

type ThreadProps = {
  columns: Array<TableColumn>,
};

const THead: React.FC<ThreadProps> = memo(({ columns }: ThreadProps) => (
  <thead>
    <tr>
      {
        columns.map(({
          name, key, type, width,
        }) => (
          <th
            key={key}
            className={`cell cell_${type}`}
            style={{
              ...(width && {
                width,
              }),
            }}
          >
            { name }
          </th>
        ))
      }
    </tr>
  </thead>
));

export default THead;
