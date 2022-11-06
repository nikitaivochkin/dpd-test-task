import React from 'react';
import { TableColumn } from 'types';
import { columnTypes } from 'components/Table/utils';

type TBodyProps = {
  data: Array<any>,
  columns: Array<TableColumn>,
};

const THead: React.FC<TBodyProps> = (props: TBodyProps) => {
  const { data, columns } = props;

  const isNoData = !data.length;

  if (isNoData) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="cell cell_no-data"
          >
            There is no data =(
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {
        data.map((user) => (
          <tr key={`${user.id}${user.phone}`}>
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
