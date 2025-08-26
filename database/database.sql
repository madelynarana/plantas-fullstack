-- Database: plantasBD

-- DROP DATABASE IF EXISTS "plantasBD";

CREATE DATABASE "plantasBD"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'es_ES.UTF-8'
    LC_CTYPE = 'es_ES.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT TEMPORARY, CONNECT ON DATABASE "plantasBD" TO PUBLIC;
GRANT CREATE, CONNECT ON DATABASE "plantasBD" TO postgres;
GRANT TEMPORARY ON DATABASE "plantasBD" TO postgres WITH GRANT OPTION;


CREATE TABLE IF NOT EXISTS plant_detail(
    entity_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    taxonomy JSONB,
    image_url TEXT,
    status CHAR(1),
    created_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO plant_detail(entity_id, name, taxonomy, image_url, status) VALUES (
    '4ba05f10504817490',
    'Aloe vera',
    '{
        "class": "Liliopsida",
        "genus": "Aloe",
        "order": "Asparagales",
        "family": "Asphodelaceae",
        "phylum": "Tracheophyta",
        "kingdom": "Plantae"
    }'::jsonb,
    'https://plant-id.ams3.cdn.digitaloceanspaces.com/knowledge_base/wikidata/462/46200b659607cd7d6cf766db0a954391ac8d775d.jpg',
    'C'
);

ALTER TABLE IF EXISTS public.plant_detail OWNER TO postgres;
