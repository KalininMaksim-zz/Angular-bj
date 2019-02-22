type TPlayer = { name: string;
    cards?: number[];
    sumCards: number;
    id: number;
    roomMaster: boolean;
    myTurn: boolean};

type Troom = {
  deck: number[],
  id: number,
  players: TPlayer,
  isInitStaite: boolean,
  result: string
};
