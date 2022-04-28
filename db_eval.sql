drop schema db_evaluation;
create schema db_evaluation;
use db_evaluation;
create table countries(country_id int, name text, continent text, gdp int, primary key (country_id));

create table cities(city_id int, name text, country_id int, primary key (city_id), foreign key (country_id) references countries(country_id));
                                                                                                                                                             
create table travelers(tid int, name text, arrived timestamp, dest_id int, primary key (tid, arrived), foreign key (dest_id) references cities(city_id));
                                                                                        
INSERT into countries values
(1, 'USA', 'North America', 18000),
(2, 'France', 'Europe', 2500),
(3, 'Brazil', 'South America', 1800),
(4, 'Spain', 'Europe', 1200),
(5, 'Chile', 'South America', 247),
(6, 'Kenya', 'Africa', 70),
(7, 'China', 'Asia' , 11000),
(8, 'India', 'Asia', 2200),
(9, 'Israel', 'Asia', 318),
(10, 'Australia', 'Australia', 1200),
(11, 'Mexico', 'North America', 1000),
(12, 'Canada', 'North America', 1500);

INSERT into cities values
(1, 'San Francisco', 1),
(2, 'Chicago', 1),
(3, 'New York', 1),
(4, 'Boston', 1),
(5, 'Paris', 2),
(6, 'Bordeaux', 2),
(7, 'Lyon', 2),
(8, 'Rio de Janeiro', 3),
(9, 'Sao Paulo', 3),
(10, 'Madrid', 4),
(11, 'Barcelona', 4),
 (12, 'Seville', 4),
(13, 'Santiago', 5),
(14, 'Nairobi', 6),
 (15, 'Mumbai', 7),
 (16, 'New Delhi', 7),
 (17, 'Shanghai', 8),
 (18, 'Beijing', 8),
 (19, 'Chengdu', 8),
 (20, 'Tel Aviv', 9),
 (21, 'Jerusalem', 9),
 (22, 'Haifa', 9),
 (23, 'Sydney', 10),
 (24, 'Melbourne', 10),
 (25, 'Perth', 10),
 (26, 'Mexcio City', 11),
 (27, 'Cancun', 11),
 (28, 'Montreal', 12),
 (29, 'Toronto', 12),
 (30, 'Vancouver', 12);

INSERT into travelers values
(1, 'Aaron',  '10-12-18', 1),
(2, 'Vanessa', '12-3-09', 1),
(3, 'Dave', '12-3-09', 1),
(4, 'Jared', '03-10-18', 3),
(5, 'Xinyu', '06-11-12', 7),
(6, 'Karen', '09-10-11', 10),
(7, 'Katrina', '01-11-01', 16),
(8, 'Mariellen', '11-11-06', 11),
(1, 'Aaron', '07-12-03', 11),
(10,'Urson', '08-12-14', 19),
(11, 'Aeriel', '11-10-11', 27),
(12, 'Hamnet', '11-10-15', 30),
(13, 'Lorne', '02-07-18', 26),
(14, 'Harriet', '04-11-15', 21),
(15, 'Rob', '06-10-18', 16),
(16, 'Joe', '03-12-12', null),
(17, 'Leo', '08-09-09', null),
(18, 'Daisy', '08-09-05', 23);                                                                                        

select * from travelers where name="Aaron";
select count(dest_id) from travelers where name="Aaron";

select * from countries;

select countries.name,cities.name from countries join cities ON (countries.name="France" && countries.country_id=cities.country_id);

insert into travelers values ()