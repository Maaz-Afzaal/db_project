DROP SCHEMA STUDENT_SCHEDULE_MANAGEMENT_SYSTEM;
CREATE SCHEMA STUDENT_SCHEDULE_MANAGEMENT_SYSTEM;
USE STUDENT_SCHEDULE_MANAGEMENT_SYSTEM;
CREATE TABLE timing (t_id int auto_increment primary key,start_at time not null,end_at time,on_date date not null);
CREATE unique index unique_timing on timing(start_at,on_date);
create table section(sec_id int primary key auto_increment,resources longtext,sec_name varchar(10),session int(4));
create table person(p_id int primary key auto_increment,p_role enum("teacher","student"),name varchar(50),email varchar(100) unique not null, unique_password varchar(20),
roll_number varchar(11));
ALTER table person Add constraint checkRole CHECK((p_role="teacher" && roll_number is null) || (p_role="student" && roll_number is not null));

create table class_occupied(c_id int auto_increment primary key,t_id int not null,foreign key(t_id) references timing(t_id),
	event enum("class","quiz"),class_name varchar(50),
	sec_id int,foreign key(sec_id) references section(sec_id),hold_by_id int,foreign key(hold_by_id) references person(p_id),
    quiz_details longtext,subject_name varchar(100));
create unique index unique_section
	ON class_occupied(t_id,sec_id);
create unique index unique_teacher
	ON class_occupied(t_id,hold_by_id);
create unique index unique_class
	ON class_occupied(t_id,class_name);

create table person_section(p_id int,foreign key(p_id) references person(p_id),sec_id int,foreign key(sec_id) references section(sec_id));

create table assignment(a_id int primary key auto_increment,assigned_by int,foreign key (assigned_by) references person(p_id),is_project bool,
	details longtext,subject_name varchar(100),sec_id int,foreign key(sec_id) references section(sec_id));
create unique index unique_section_session
	ON section (sec_name,session);
create table todo(p_id int,foreign key(p_id) references person(p_id),todo_id int primary key auto_increment,details longtext);

create table result(r_id int primary key auto_increment,p_id int,
uploaded_by_id int,foreign key(uploaded_by_id) references person(p_id),
foreign key(p_id) references person(p_id),
percentage int check(percentage<=100),subject_name varchar(100));

create unique index unique_person_result on result(p_id,subject_name);
insert into section(sec_name,session) values ("A","2017");
insert into section(sec_name,session) values ("B","2017");
insert into person (p_role,name,email,unique_password) values ("teacher","teacher1","teacher1@uet.edu.pk","teacher1password");
insert into person (p_role,name,email,unique_password) values ("teacher","teacher2","teacher2@uet.edu.pk","teacher1password");
insert into person (p_role,name,email,unique_password,roll_number) values ("student","student1","student1@uet.edu.pk","student1password","sdd1");
insert into person (p_role,name,email,unique_password,roll_number) values ("student","student2","student2@uet.edu.pk","student1password","sdd2");

select * from timing;
select start_at,end_at,on_date,class_name,sec_name,session,event,quiz_details,subject_name from class_occupied 
join timing ON class_occupied.t_id=timing.t_id JOIN section ON section.sec_id=class_occupied.sec_id where hold_by_id=2 ;

select start_at,end_at,on_date,class_name,sec_name,session,event,quiz_details,subject_name from class_occupied 
join timing ON class_occupied.t_id=timing.t_id JOIN section ON section.sec_id=class_occupied.sec_id where class_occupied.sec_id=1 ;
select * from person_section where p_id=1;
insert into section (sec_name,session) values  ( C,2018),( D,2017);
select * from person_section;
insert into assignment (assigned_by,is_project,details,subject_name,sec_id) values ("1",true,"asdas","database","1");
select * from person join person_section ON person_section.p_id=person.p_id ;