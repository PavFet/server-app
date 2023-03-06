create table bvugtsxw5tbh0ey2c4c5.users (
  id int1 unsigned primary key auto_increment,
  email varchar(64) not null,
  password varchar(32) not null,
  name varchar(64) not null,
  surname varchar(64) not null,
  role enum('USER', 'ADMIN') default ('USER'),
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp
);