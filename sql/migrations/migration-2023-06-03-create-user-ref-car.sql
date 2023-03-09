SET SQL_SAFE_UPDATES = 0

alter table cars 
add ownerId int4 unsigned,
add foreign key (ownerId) references users(id);

update cars
set ownerId = LAST_INSERT_ID();

alter table cars 
modify ownerId int4 unsigned not null;
