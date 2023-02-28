type PrivateCarModel = {
  'id': number,
  'name': string,
  'technical_characteristics': {
    'miles_per_gallon': number,
    'cylinders': number,
    'displacement': number,
    'horsepower': number,
    'weight_in_lbs': number,
    'acceleration': number
  },
  'year': number,
  'origin': string,
  'images': string[]
};

type CarModel = PrivateCarModel & RowDataPacket;
