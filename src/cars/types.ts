import { RowDataPacket } from 'mysql2';

type PrivateViewCarModel = {
  id: number,
  name: string,
  technical_characteristics: {
    miles_per_gallon: number,
    cylinders: number,
    displacement: number,
    horsepower: number,
    weight_in_lbs: number,
    acceleration: number
  },
  year: number,
  origin: string,
  images: string[],
  owner: {
    id: number,
    name: string,
    surname: string,
    email: string,
  }
};

export type CarViewModel = PrivateViewCarModel & RowDataPacket;

export type CarData = Omit<PrivateViewCarModel, 'id' | 'owner'> & {
  ownerId: number,
};

export type CarBody = Omit<CarData, 'ownerId'>;

export type PartialCarBody = Partial<CarBody>;
