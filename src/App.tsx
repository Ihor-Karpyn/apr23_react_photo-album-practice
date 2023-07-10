import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromServer from './api/users';
import albumsFromServer from './api/albums';
import { PhototTable } from './components/Table/PhotoTable';
import { getVisiblePhotos, preparedPhotos } from './utils/utils';

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedAblumsId, setSelectedAblumsId] = useState<number[]>([]);
  const [sortType, setSortType] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visiblePhotos = getVisiblePhotos(
    preparedPhotos,
    query,
    selectedUserId,
    selectedAblumsId,
    sortType,
    isReversed,
  );

  function resetAllFilters() {
    setQuery('');
    setSelectedUserId(null);
    setSelectedAblumsId([]);
  }

  function isAlbumSelected(albumId: number): boolean {
    return selectedAblumsId.includes(albumId);
  }

  function toggleAlbum(albumId: number) {
    if (isAlbumSelected(albumId)) {
      setSelectedAblumsId(selectedAblumsId.filter(id => id !== albumId));
    } else {
      setSelectedAblumsId([...selectedAblumsId, albumId]);
    }
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                href="#/"
                className={classNames({
                  'is-active': selectedUserId === null,
                })}
                onClick={() => setSelectedUserId(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  href="#/"
                  key={`${user.id}`}
                  className={classNames({
                    'is-active': selectedUserId === user.id,
                  })}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                className={classNames('button is-success mr-6', {
                  'is-outlined': selectedAblumsId.length !== 0,
                })}
                onClick={() => setSelectedAblumsId([])}
              >
                All
              </a>

              {albumsFromServer.map(album => (
                <a
                  className={classNames('button mr-2 my-1', {
                    'is-info': isAlbumSelected(album.id),
                  })}
                  href="#/"
                  key={`${album.id}`}
                  onClick={() => toggleAlbum(album.id)}
                >
                  {album.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                href="#/"
                className={classNames('button is-link is-fullwidth', {
                  'is-outlined': selectedAblumsId.length === 0,
                })}
                onClick={resetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visiblePhotos.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No photos matching selected criteria
            </p>
          ) : (
            <PhototTable
              photos={visiblePhotos}
              sortType={sortType}
              onSortTypeChange={setSortType}
              isReversed={isReversed}
              onReverseChange={setIsReversed}
            />
          )}
        </div>
      </div>
    </div>
  );
};
