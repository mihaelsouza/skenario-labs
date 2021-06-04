drop database propertyviewer;
drop owned by skenariolabs;
drop user skenariolabs;

create user skenariolabs with password 'unsecurepassword';
create database propertyviewer with template=template0 owner=skenariolabs;

\connect propertyviewer;

create table users(
  user_id integer primary key not null,
  username varchar(20) not null,
  email varchar(30) not null,
  password text not null
);

create table properties(
  property_id integer primary key not null,
  user_id integer not null,
  name varchar(30) not null,
  street varchar(50) not null,
  postal_code varchar(30) not null,
  city varchar(50) not null,
  municipality varchar(50) not null,
  country varchar(50) not null,
  longitude real not null,
  latitude real not null,
  description varchar(1000) not null
);
alter table properties add constraint prop_users_fk
foreign key (user_id) references users(user_id);

alter table users owner to skenariolabs;
alter table properties owner to skenariolabs;