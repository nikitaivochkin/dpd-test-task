import React, {
  useEffect,
  useState,
  useRef,
  MouseEvent,
  ChangeEvent,
} from 'react';
import inRange from 'lodash.inrange';
import noop from 'lodash.noop';
import cx from 'classnames';
import { buildURL, createArray } from 'utils';

import './styles.scss';

export type Settings = {
  current: number,
  perPage: number,
};

type PaginationProps = {
  disabled?: boolean,
  settings: Settings,
  chunks: number,
  showJumper?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChange: ({ perPage, current }: Settings) => void,
}

const Pagination: React.FC<PaginationProps> = ({
  settings,
  chunks,
  disabled = false,
  onChange,
  showJumper = true,
}: PaginationProps) => {
  const { current } = settings;

  const startIndex = 1;
  const numOfPaginButtons = startIndex + 4;

  const jumperRef = useRef<HTMLInputElement | null>(null);

  const defaultSliceParams: [number, number] = [startIndex, numOfPaginButtons];
  const [sliceParams, setSliceParams] = useState<[number, number]>(defaultSliceParams);

  const paginElements = createArray(chunks).slice(...sliceParams);

  const isFirst = current === 1;
  const isLast = current === chunks;

  const inStart = inRange(current, 1, numOfPaginButtons);
  const inMiddle = inRange(current, numOfPaginButtons, chunks - numOfPaginButtons + 2);
  const inEnd = inRange(current, chunks - numOfPaginButtons + 2, chunks + 1);

  useEffect(() => {
    if (inStart) {
      setSliceParams(defaultSliceParams);
    } else if (inMiddle) {
      const start = current - 3;
      const end = start + 5;

      setSliceParams([start, end]);
    } else {
      const start = chunks - numOfPaginButtons;
      const end = chunks - 1;

      setSliceParams([start, end]);
    }
  }, [current]);

  useEffect(() => {
    const v = String(settings.current);
    if (jumperRef.current !== null) {
      jumperRef.current.value = v;
    }
  }, [settings.current]);

  // eslint-disable-next-line no-unused-vars
  const handleChangeByBtns = (n: number) => (_e: MouseEvent<HTMLButtonElement>): void => {
    onChange({ ...settings, current: n });
  };

  const handleChangeByJumber = (e: ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = e;
    const n = !value ? 1 : Number(value);

    onChange({ ...settings, current: inRange(n, chunks + 1) ? n : 1 });
  };

  // useEffect(() => {
  //   onChange({ ...settings, current });
  // }, []);

  const prevBtnClassNames = cx({
    pagination__element: true,
    pagination__element_prev: true,
    pagination__element_disabled: isFirst,
  });

  const nextBtnClassNames = cx({
    pagination__element: true,
    pagination__element_next: true,
    pagination__element_disabled: isLast,
  });

  const points = (
    <span
      className="pagination__points"
    />
  );

  const canShowSlicedBtns = chunks > numOfPaginButtons + 1;

  return (
    <div className={cx({
      pagination: true,
      disabled,
    })}
    >
      <div className="pagination__container">
        <button
          className={prevBtnClassNames}
          type="button"
          aria-label="prev"
          onClick={isFirst ? noop : handleChangeByBtns(current - 1)}
        />
        {
          canShowSlicedBtns && (
            <>
              <button
                className={cx({
                  pagination__element: true,
                  pagination__element_active: current === 1,
                })}
                type="button"
                onClick={handleChangeByBtns(1)}
              >
                1
              </button>
              {
                (inMiddle || inEnd) && points
              }
              {
                paginElements.map((n) => (
                  <button
                    key={n}
                    className={cx({
                      pagination__element: true,
                      pagination__element_active: n === current,
                    })}
                    type="button"
                    onClick={handleChangeByBtns(n)}
                  >
                    { n }
                  </button>
                ))
              }
              {
                (inStart || inMiddle) && points
              }
              <button
                className={cx({
                  pagination__element: true,
                  pagination__element_active: current === chunks,
                })}
                type="button"
                onClick={handleChangeByBtns(chunks)}
              >
                { chunks }
              </button>
            </>
          )
        }

        {
          !canShowSlicedBtns && (
            <>
              {
                createArray(chunks).map((_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={cx({
                      pagination__element: true,
                      pagination__element_active: n === current,
                    })}
                    type="button"
                    onClick={handleChangeByBtns(n)}
                  >
                    { n }
                  </button>
                ))
              }
            </>
          )
        }

        <button
          className={nextBtnClassNames}
          type="button"
          aria-label="next"
          onClick={isLast ? noop : handleChangeByBtns(current + 1)}
        />
      </div>
      {
        showJumper && (
          <input
            type="number"
            name="jumper"
            ref={jumperRef}
            onBlur={handleChangeByJumber}
            min={1}
            max={chunks}
          />
        )
      }
    </div>
  );
};

export default Pagination;
