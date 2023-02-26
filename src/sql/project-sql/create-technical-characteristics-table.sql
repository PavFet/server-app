create table technicalCharacteristics (
  id int1 unsigned primary key auto_increment,
  miles_per_gallon int1 not null,
  cylinders int1 not null,
  displacement int1 not null,
  horsepower int1 not null,
  weight_in_lbs int1 not null,
  acceleration int1 not null,
  createdAt timestamp default current_timestamp,
  updateddAt timestamp default current_timestamp on update current_timestamp
);