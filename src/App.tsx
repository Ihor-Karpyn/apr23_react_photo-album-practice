import React from 'react';
import './App.scss';

import albumsFromServer from './api/albums';
import photosFromServer from './api/photos';
import usersFromServer from './api/users';

export const App: React.FC = () => {
  const renderPhotos = () => {
    return photosFromServer.map((photo) => {
      const findAlbum = albumsFromServer
        .find(album => album.id === photo.albumId);
      const findUser = usersFromServer
        .find(user => user.id === findAlbum?.userId);

      const userSexClass = findUser?.sex === 'm'
        ? 'has-text-link'
        : 'has-text-danger';

      return (
        <tr key={photo.id}>
          <td className="has-text-weight-bold">{photo.id}</td>
          <td>{photo.title}</td>
          <td>{findAlbum?.title}</td>
          <td className={userSexClass}>{findUser?.name}</td>
        </tr>
      );
    });
  };

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
              >
                All
              </a>

              <a
                href="#/"
              >
                User 1
              </a>

              <a
                href="#/"
                className="is-active"
              >
                User 2
              </a>

              <a
                href="#/"
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Album 1
              </a>

              <a
                className="button mr-2 my-1"
                href="#/"
              >
                Album 2
              </a>

              <a
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Album 3
              </a>
              <a
                className="button mr-2 my-1"
                href="#/"
              >
                Album 4
              </a>
              <a
                className="button mr-2 my-1"
                href="#/"
              >
                Album 5
              </a>
            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"

              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <table className="table is-striped is-narrow is-fullwidth">
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Photo name
                    <a href="#/">
                      <span className="icon">
                        <i className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Album name
                    <a href="#/">
                      <span className="icon">
                        <i className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User name
                    <a href="#/">
                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>{renderPhotos()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
