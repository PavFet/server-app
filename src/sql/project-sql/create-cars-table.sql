create table cars (
  id int1 unsigned primary key auto_increment,
  name varchar(256) not null,
  technicalCharacteristicsId id int1 unsigned not null,
  createdAt timestamp default current_timestamp,
  updateddAt timestamp default current_timestamp on update current_timestamp
  FOREIGN KEY (technicalCharacteristicsId) REFERENCES technicalCharacteristics(id)
);