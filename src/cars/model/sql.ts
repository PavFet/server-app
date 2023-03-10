const SELECT = `
SELECT 
  c.id, 
  c.name, 
  JSON_OBJECT(
    'miles_per_gallon', th.miles_per_gallon,
    'cylinders', th.cylinders,
    'displacement', th.displacement,
    'horsepower', th.horsepower, 
    'weight_in_lbs', th.weight_in_lbs,
    'acceleration', th.acceleration) as technicalCharacteristics, 
  c.year, 
  c.origin, 
   JSON_OBJECT(
    'id', u.id,
    'name', u.name,
    'surname', u.surname,
    'email', u.email) as owner,
IF(COUNT(i.id) = 0, JSON_ARRAY(), json_arrayagg(i.src)) as images
FROM cars as c
LEFT JOIN images as i
ON i.carId = c.id
LEFT JOIN  technicalCharacteristics as th
ON c.technicalCharacteristicsId = th.id
LEFT JOIN users as u
ON u.id = c.ownerId
`;

const GROUP = 'GROUP BY c.id;';

const SQL = {
  SELECT,
  GROUP,
} as const;

export default SQL;
