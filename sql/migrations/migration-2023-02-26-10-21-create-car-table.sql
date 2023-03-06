create table bvugtsxw5tbh0ey2c4c5.technicalCharacteristics (
  id int1 unsigned primary key auto_increment,
  miles_per_gallon int1 not null,
  cylinders int1 not null,
  displacement int2 not null,
  horsepower int2 not null,
  weight_in_lbs int2 not null,
  acceleration float4 not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp
);

create table bvugtsxw5tbh0ey2c4c5.cars (
  id int1 unsigned primary key auto_increment,
  name varchar(256) not null,
  technicalCharacteristicsId int1 unsigned not null unique,
  year int2 unsigned not null,
  origin varchar(8) not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (technicalCharacteristicsId) REFERENCES technicalCharacteristics(id)
);

create table bvugtsxw5tbh0ey2c4c5.images (
  id int1 unsigned primary key auto_increment,
  src  varchar(512) not null,
  carId int1 unsigned not null,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (carId) REFERENCES cars(id)
);