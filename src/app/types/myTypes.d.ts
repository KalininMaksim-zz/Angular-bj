type TPlayer = { name: string;
    cards?: number[];
    sumCards: number;
    id: number;
    roomMaster: boolean;
    state: boolean};

type Troom = {
  deck: number[],
  id: number,
  players: TPlayer,
};
