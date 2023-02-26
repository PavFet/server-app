const cars: CarModel[] = [
  {
    id: '1',
    name: 'chevrolet chevelle malibu',
    technical_characteristics: {
      miles_per_gallon: 18,
      cylinders: 8,
      displacement: 307,
      horsepower: 130,
      weight_in_lbs: 3504,
      acceleration: 12,
    },
    year: 1972,
    origin: 'USA',
    images: [
      'http://localhost:5009/chevrolet-chevelle-malibu.jpg',
      'http://localhost:5009/chevrolet-chevelle-malibu2.jpg',
      'http://localhost:5009/chevrolet-chevelle-malibu3.jpg',
    ],
  },
  {
    id: '2',
    name: 'buick skylark 320',
    technical_characteristics: {
      miles_per_gallon: 15,
      cylinders: 8,
      displacement: 350,
      horsepower: 165,
      weight_in_lbs: 3693,
      acceleration: 11.5,
    },
    year: 1964,
    origin: 'USA',
    images: [
      'http://localhost:5009/buick-skylark.jpg',
      'http://localhost:5009/buick-skylark2.jpg',
      'http://localhost:5009/buick-skylark3.jpg',
    ],
  },
  {
    id: '3',
    name: 'plymouth satellite',
    technical_characteristics: {
      miles_per_gallon: 18,
      cylinders: 8,
      displacement: 318,
      horsepower: 150,
      weight_in_lbs: 3436,
      acceleration: 11,
    },
    year: 1971,
    origin: 'USA',
    images: [
      'http://localhost:5009/1972-plymouth-satellite-sebring.jpg',
      'http://localhost:5009/1972-plymouth-satellite-sebring2.jpg',
      'http://localhost:5009/1972-plymouth-satellite-sebring3.jpg',
    ],
  },
  {
    id: '4',
    name: 'amc rebel sst',
    technical_characteristics: {
      miles_per_gallon: 16,
      cylinders: 8,
      displacement: 304,
      horsepower: 150,
      weight_in_lbs: 3433,
      acceleration: 12,
    },
    year: 1969,
    origin: 'USA',
    images: [
      'http://localhost:5009/1967-amc-rambler-rebel-sst.jpg',
      'http://localhost:5009/1967-amc-rambler-rebel-sst2.jpg',
      'http://localhost:5009/1967-amc-rambler-rebel-sst3.jpg',
    ],
  },
  {
    id: '5',
    name: 'ford torino',
    technical_characteristics: {
      miles_per_gallon: 17,
      cylinders: 8,
      displacement: 302,
      horsepower: 140,
      weight_in_lbs: 3449,
      acceleration: 10.5,
    },
    year: 1974,
    origin: 'USA',
    images: [
      'http://localhost:5009/800px-1970_ford_torino_cobra_sportsroof_chiolero.jpg',
      'http://localhost:5009/800px-1970_ford_torino_cobra_sportsroof_chiolero2.jpg',
      'http://localhost:5009/800px-1970_ford_torino_cobra_sportsroof_chiolero3.jpg',
    ],
  },
  {
    id: '6',
    name: 'ford galaxie 500',
    technical_characteristics: {
      miles_per_gallon: 15,
      cylinders: 8,
      displacement: 429,
      horsepower: 198,
      weight_in_lbs: 4341,
      acceleration: 10,
    },

    year: 1966,
    origin: 'USA',
    images: [
      'http://localhost:5009/1966-ford-galaxie-500.jpg',
      'http://localhost:5009/1966-ford-galaxie-5002.jpg',
      'http://localhost:5009/1966-ford-galaxie-5003.jpg',
    ],
  },
  {
    id: '7',
    name: 'chevrolet impala',
    technical_characteristics: {
      miles_per_gallon: 14,
      cylinders: 8,
      displacement: 454,
      horsepower: 220,
      weight_in_lbs: 4354,
      acceleration: 9,
    },
    year: 1958,
    origin: 'USA',
    images: [
      'http://localhost:5009/1958-chevrolet-impala-sport-coupe.jpg',
      'http://localhost:5009/1958-chevrolet-impala-sport-coupe2.jpg',
      'http://localhost:5009/1958-chevrolet-impala-sport-coupe3.jpg',
    ],
  },
  {
    id: '8',
    name: 'plymouth fury iii',
    technical_characteristics: {
      miles_per_gallon: 14,
      cylinders: 8,
      displacement: 440,
      horsepower: 215,
      weight_in_lbs: 4312,
      acceleration: 8.5,
    },
    year: 1967,
    origin: 'USA',
    images: [
      'http://localhost:5009/Praha_Chodov_U_Kunratickeho_lesa_Plymouth_Fury_III_b.jpg',
      'http://localhost:5009/Praha_Chodov_U_Kunratickeho_lesa_Plymouth_Fury_III_b2.jpg',
      'http://localhost:5009/Praha_Chodov_U_Kunratickeho_lesa_Plymouth_Fury_III_b3.jpg',
    ],
  },
  {
    id: '9',
    name: 'Porsche 911',
    technical_characteristics: {
      miles_per_gallon: 14,
      cylinders: 8,
      displacement: 440,
      horsepower: 215,
      weight_in_lbs: 4312,
      acceleration: 8.5,
    },
    year: 1968,
    origin: 'EU',
    images: [
      'http://localhost:5009/porsche911.jpg',
      'http://localhost:5009/porsche9112.jpg',
      'http://localhost:5009/porsche9113.jpg',
    ],
  },
  {
    id: '10',
    name: 'Lamborghini Miura',
    technical_characteristics: {
      miles_per_gallon: 14,
      cylinders: 8,
      displacement: 440,
      horsepower: 215,
      weight_in_lbs: 4312,
      acceleration: 8.5,
    },
    year: 1967,
    origin: 'EU',
    images: [
      'http://localhost:5009/lambo.jpg',
      'http://localhost:5009/lambo2.jpg',
      'http://localhost:5009/lambo3.jpg',
    ],
  },
  {
    id: '11',
    name: 'Volvo P1800 S',
    technical_characteristics: {
      miles_per_gallon: 14,
      cylinders: 8,
      displacement: 440,
      horsepower: 215,
      weight_in_lbs: 4312,
      acceleration: 8.5,
    },
    year: 1962,
    origin: 'EU',
    images: [
      'http://localhost:5009/volvo.jpg',
      'http://localhost:5009/volvo2.jpg',
      'http://localhost:5009/volvo3.jpg',
    ],
  },
  {
    id: '12',
    name: 'Ferrari 275 GTB/2',
    technical_characteristics: {
      miles_per_gallon: 14,
      cylinders: 8,
      displacement: 440,
      horsepower: 215,
      weight_in_lbs: 4312,
      acceleration: 8.5,
    },
    year: 1966,
    origin: 'EU',
    images: [
      'http://localhost:5009/ferra.jpg',
      'http://localhost:5009/ferra2.jpg',
      'http://localhost:5009/ferra3.jpg',
    ],
  },
];

export default cars;

// eslint-disable-next-line array-callback-return
const technicalChar = cars.map((car) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  `(${car.technical_characteristics.miles_per_gallon}, ${car.technical_characteristics.cylinders})`;
});

console.log(technicalChar);
