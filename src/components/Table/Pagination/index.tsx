import React from 'react';
import cx from 'classnames';

import './styles.scss';

export type PaginationProps = {
  total: number,
  current?: number,
  disabled?: boolean,
  // showJumper?: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  current = 1,
  disabled = false,
  // showJumper = false,
}: PaginationProps) => {
  const arr = [...Array(total)].map((_, i) => i + 1).slice(0, 6);

  return (
    <div className={cx({
      pagination: true,
      disabled,
    })}
    >
      <div className="pagination__container">
        <div
          className="pagination__element pagination__element_prev"
        />
        {
          arr.map((n) => (
            <div
              key={n}
              className={cx({
                pagination__element: true,
                pagination__element_active: n === current,
              })}
            >
              { n }
            </div>
          ))
        }
        <div
          className="pagination__element pagination__element_next"
        />
      </div>
    </div>
  );
};

export default Pagination;
