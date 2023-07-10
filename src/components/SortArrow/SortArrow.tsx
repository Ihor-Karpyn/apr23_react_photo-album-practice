import React from 'react';
import classNames from 'classnames';

type Prop = {
  sortType: string,
  isReversed: boolean,
  onSortBy: (type: string) => void,
};

export const SortArrow: React.FC<Prop> = ({
  sortType,
  isReversed,
  onSortBy,
}) => {
  const sortTypes: string[] = ['ID', 'Photo name', 'Album name', 'User name'];

  return (
    <>
      {sortTypes.map((type: string) => (
        <th key={type}>
          <span className="is-flex is-flex-wrap-nowrap">
            {type}

            <a
              href="#/"
              onClick={() => onSortBy(type)}
            >
              <span className="icon">
                <i
                  data-cy="SortIcon"
                  className={classNames('fas', {
                    'fa-sort': sortType !== type,
                    'fa-sort-down': sortType === type && isReversed,
                    'fa-sort-up': sortType === type && !isReversed,
                  })}
                />
              </span>
            </a>
          </span>
        </th>
      ))}
    </>
  );
};
