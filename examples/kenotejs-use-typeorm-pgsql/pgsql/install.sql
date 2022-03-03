DROP DATABASE IF EXISTS "kenotejs-use-typeorm";
CREATE DATABASE "kenotejs-use-typeorm";

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
