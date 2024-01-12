DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,firstName VARCHAR(8) NOT NULL
  ,lastName  VARCHAR(9) NOT NULL
  ,position  VARCHAR(12) NOT NULL
  ,weight  VARCHAR(6) NOT NULL
  ,length  VARCHAR(6) NOT NULL
  ,club  VARCHAR(19) NOT NULL
  ,color     VARCHAR(6) NOT NULL
  ,bestfoot  VARCHAR(6) NOT NULL

);
INSERT INTO users(id,firstName,lastName,position,weight,length,club,color,bestfoot) VALUES (1,'Cristiano','Ronaldo','Forward','80kg', '187cm', 'Al-Nassr FC', 'yellow', 'Both');
INSERT INTO users(id,firstName,lastName,position,weight,length,club,color,bestfoot ) VALUES (2,'Robert','Lewandowski','Forward','81kg', '185cm', 'FC Barcelona', 'blue', 'Right');
INSERT INTO users(id,firstName,lastName,position,weight,length,club,color,bestfoot) VALUES (3,'Lionel','Messi','Forward','67kg', '170cm', 'Inter Miami CF', 'pink', 'Left');




select * from users;