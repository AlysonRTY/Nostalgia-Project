export interface PlayerT {
  name: string;
  image: string;
  desc: string;
  id: string;
  club: string;
  nation: string;
  position: string;
  rank: number;
  rating: number;
}

export type PlayersT = PlayerT[];

export interface PlayerD {
  id: number;
  name: string;
  rating: string;
  position: string;
  image: string;
  weak_foot: number;
  skill_moves: number;
  preferred_foot: string;
  height: number;
  weight: number;
  work_rate: string;
  stats: Stats;
  club: string;
  nation: string;
}

interface Stats {
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physical?: number;
  diving?: number;
  handling?: number;
  kicking?: number;
  reflexes?: number;
  speed?: number;
  positioning?: number;
}

export type PlayersD = PlayerD[];

export type PlayerListDProps = {
  players: PlayersD;
};

export type PlayerListProps = {
  players: PlayersT;
  start: number;
  end: number;
  isTop3?: boolean;
};

export type Comment = {
  id: string;
  text: string;
  author: string;
  date: string;
  userId: string;
};
