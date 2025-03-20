export interface PlayerT {
  name: string;
  image: string;
  desc: string;
  id: string;
  club: string;
  nation: string;
  position: string;
  rank: number;
}

export type PlayersT = PlayerT[];