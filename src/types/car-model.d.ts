type CarModel = {
  'id': string,
  'name': string,
  'technical_characteristics': {
    'miles_per_gallon': number,
    'cylinders': number,
    'displacement': number,
    'horsepower': number,
    'weight_in_lbs': number,
    'acceleration': number
  },
  'year': string,
  'origin': string,
  'images': string[]
};
