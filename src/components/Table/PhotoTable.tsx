import classNames from 'classnames';
import { Photos } from '../../types/types';
import { SortArrow } from '../SortArrow/SortArrow';

interface Prop {
  photos: Photos[];
  sortType: string,
  onSortTypeChange: React.Dispatch<React.SetStateAction<string>>,
  isReversed: boolean,
  onReverseChange: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PhototTable: React.FC<Prop> = ({
  photos,
  sortType,
  onSortTypeChange,
  isReversed,
  onReverseChange,
}) => {
  const sortBy = (newSortType: string) => {
    if (newSortType !== sortType) {
      onSortTypeChange(newSortType);
      onReverseChange(false);
    }

    if (newSortType === sortType && !isReversed) {
      onSortTypeChange(newSortType);
      onReverseChange(true);
    }

    if (newSortType === sortType && isReversed) {
      onSortTypeChange('');
      onReverseChange(false);
    }
  };

  return (
    <table
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortArrow
            sortType={sortType}
            isReversed={isReversed}
            onSortBy={sortBy}
          />
        </tr>
      </thead>

      <tbody>
        {photos.map(photo => (
          <tr key={photo.title}>
            <td className="has-text-weight-bold">
              {photo.id}
            </td>

            <td>{photo.title}</td>
            <td>{photo.album.title}</td>

            <td
              className={classNames({
                'has-text-link': photo.user.sex === 'm',
                'has-text-danger': photo.user.sex === 'f',
              })}
            >
              {photo.user.name}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
