// for players.json
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

// ----------------------------------------
// for details.json


export interface PlayerD {
  id: number;
  name: string;
  position: string;
  image: string;
  weak_foot: number;
  skill_moves: number;
  preferred_foot: string;
  height: number;
  weight: number;
  work_rate: string;
  stats: Stats;
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