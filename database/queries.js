
/*
    db_info table
*/

const createDBInfoTable = `create table if not exists db_info(
    last_db_version integer
);`;

const getLastDbVersion = `select last_db_version from db_info order by last_db_version desc limit 1`;

const insertDBVersion = 'insert into db_info (last_db_version) values(?);'
const updateDBVersion = `update db_info set last_db_version=?;`


/*
    plants table
*/

const createPlantsTable = `create table if not exists plants(
    id integer primary key,
    name varchar,
    species varchar,
    description text,
    image varchar,
    wateringdays integer,
    last_watering integer
);`;

const dropPlantsTable = `drop table if exists plants;`

const selectPlants = `select * from plants;`;

const selectPlant = `select * from plants where id=?;`;

const insertPlant = `insert into plants(name, species, description, image, wateringdays) values(?, ?, ?, ?, ?);`;

const updatePlant = `update plants set name=?, species=?, description=?, image=?, wateringdays=? where id=?;`;

const deletePlant = `delete from plants where id=?;`;


/*
    watering history table
*/

const createWateringTable = `create table if not exists watering(
    id integer primary key,
    plant_id integer,
    timestamp integer
);`;

const dropWateringTable = `drop table if exists watering;`

const selectWateringForPlant = `select * from watering where plant_id=?;`;
const insertWatering = `insert into watering(plant_id, timestamp) values(?, ?);`;

const createWateringTrigger = `create trigger if not exists onPlantWatering after insert on watering
                                begin
                                    update plants set last_watering=new.timestamp where id=new.plant_id and (new.timestamp > (select last_watering from plants where id=new.plant_id) or last_watering is null);
                                end;`;

const dropWateringTrigger = `drop trigger if exists onPlantWatering;`;



export { createPlantsTable, dropPlantsTable, selectPlants, selectPlant, insertPlant, updatePlant, deletePlant, createDBInfoTable, getLastDbVersion, insertDBVersion, updateDBVersion, createWateringTable, dropWateringTable, selectWateringForPlant, insertWatering, createWateringTrigger, dropWateringTrigger }