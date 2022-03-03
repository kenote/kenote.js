CREATE DATABASE "kenotejs-use-typeorm";
CREATE USER docker WITH PASSWORD 'docker';
GRANT ALL PRIVILEGES ON DATABASE "kenotejs-use-typeorm" TO docker;

\connect "kenotejs-use-typeorm";

CREATE TABLE "user" (
  id bigserial NOT NULL,
  username varchar NULL,
  password varchar NULL,
  jwtoken varchar NULL,
  CONSTRAINT user_pk PRIMARY KEY (id)
);

INSERT INTO "user"
(id, username, password, jwtoken)
VALUES(1, 'admin', 'admin', NULL);
INSERT INTO "user"
(id, username, password, jwtoken)
VALUES(2, 'thondery', 'td9828', NULL);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO docker;