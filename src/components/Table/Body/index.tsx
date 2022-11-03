import React from 'react';
import { TableColumn } from 'types';
import { columnTypes } from 'components/Table/utils';

type TBodyProps = {
  data: Array<any>,
  columns: Array<TableColumn>,
};

const THead: React.FC<TBodyProps> = (props: TBodyProps) => {
  const { data, columns } = props;

  return (
    <tbody>
      {
        data.map((user) => (
          <tr key={user.id}>
            {
                columns.map(({ dataIndex, type, name }) => (
                  <td
                    key={`${user.id}-${name}`}
                    className={`cell cell_${type}`}
                  >
                    <div className="cell__container">
                      { columnTypes[type](user[dataIndex]) }
                    </div>
                  </td>
                ))
              }
          </tr>
        ))
      }
    </tbody>
  );
};

export default THead;
