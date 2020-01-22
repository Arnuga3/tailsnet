# Tailsnet

## Database - PostgreSQL


### **Users** table

column        | type
-------------- | ------------------
id            | integer
title         | character varying
name          | character varying
surname       | character varying
dob           | character varying
email         | character varying
password      | character varying
profile_image | character varying


### **Pets** table
 
column        | type
-------------- | ------------------
id            | integer
type          | character varying
name          | character varying
dob           | character varying
profile_image | character varying
user_id       | integer