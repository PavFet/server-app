create table technicalCharacteristics (
  id int1 unsigned primary key auto_increment,
  miles_per_gallon int1 not null,
  cylinders int1 not null,
  displacement int1 not null,
  horsepower int1 not null,
  weight_in_lbs int1 not null,
  acceleration float4 not null,
  createdAt timestamp default current_timestamp,
  updateddAt timestamp default current_timestamp on update current_timestamp
);

create table cars (
  id int1 unsigned primary key auto_increment,
  name varchar(256) not null,
  technicalCharacteristicsId int1 unsigned not null unique,
  year int1 unsigned not null,
  origin varchar(8) not null,
  createdAt timestamp default current_timestamp,
  updateddAt timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (technicalCharacteristicsId) REFERENCES technicalCharacteristics(id)
);