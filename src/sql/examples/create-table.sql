create table users (
  id int1 usigned primary key auto_incerement,
  email varchar(64) not null,
  password varchar(32) not null,
  firstName varchar(64) not null,
  lastname varchar(64) not null,
  createdAt timestamp default current_timestamp,
  updateddAt timestamp default current_timestamp on update current_timestamp
);