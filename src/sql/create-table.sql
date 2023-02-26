create table users (
  id int1 usigned primary key auto_incerement,
  email varchar(64),
  password varchar(32),
  firstName varchar(64),
  lastname varchar(64),
  createdAt timestamp default current_timestamp,
  updateddAt timestamp default current_timestamp on update current_timestamp
);