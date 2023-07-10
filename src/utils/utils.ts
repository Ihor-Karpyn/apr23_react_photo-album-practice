import albumsFromServer from '../api/albums';
import usersFromServer from '../api/users';
import photosFromServer from '../api/photos';
import { Album, Photos, User } from '../types/types';

export function getAlbumById(albumId: number): Album | null {
  return albumsFromServer.find(album => album.id === albumId)
    || null;
}

export function getUserById(userId: number | undefined): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const preparedPhotos = photosFromServer.map(photo => ({
  ...photo,
  album: getAlbumById(photo.albumId),
  user: getUserById(getAlbumById(photo.albumId)?.userId),
}));

export function getVisiblePhotos(
  photos: Photos[],
  query: string,
  selectedUserId: number | null,
  selectedAblumsId: number[],
  sortType: string,
  isReversed: boolean,
) {
  let visiblePhotos: Photos[] = [...photos];

  if (query) {
    const normalizeQuery = query.toLowerCase();

    visiblePhotos = visiblePhotos.filter(
      photo => photo.title.toLowerCase().includes(normalizeQuery),
    );
  }

  if (selectedUserId) {
    visiblePhotos = visiblePhotos.filter(
      photo => photo.user.id === selectedUserId,
    );
  }

  if (selectedAblumsId.length > 0) {
    visiblePhotos = visiblePhotos.filter(
      photo => selectedAblumsId.some(id => id === photo.albumId),
    );
  }

  if (sortType) {
    visiblePhotos.sort((photo1, photo2) => {
      switch (sortType) {
        case 'ID':
          return photo1.id - photo2.id;

        case 'Photo name':
          return photo1.title.localeCompare(photo2.title);

        case 'Album name':
          return photo1.album.title.localeCompare(photo2.album.title);

        case 'User name':
          return photo1.user.name.localeCompare(photo2.user.name);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visiblePhotos.reverse();
  }

  return visiblePhotos;
}
