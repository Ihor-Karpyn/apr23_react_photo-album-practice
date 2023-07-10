export type Album = {
  userId: number,
  id: number,
  title: string,
};

export type User = {
  id: number,
  name: string,
  sex: string,
};

export type Photos = {
  albumId: number,
  id: number,
  title: string,
  url: string,
};
