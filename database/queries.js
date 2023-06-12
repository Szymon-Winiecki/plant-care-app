
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
    image varchar
);`;

const dropPlantsTable = `drop table if exists plants;`

const selectPlants = `select * from plants;`;

const selectPlant = `select * from plants where id=?;`;

const insertPlant = `insert into plants(name, species, description, image) values(?, ?, ?, ?);`;

const updatePlant = `update plants set name=?, species=?, description=?, image=? where id=?;`;

const deletePlant = `delete from plants where id=?;`;

export {createPlantsTable, dropPlantsTable, selectPlants, selectPlant, insertPlant, updatePlant, deletePlant, createDBInfoTable, getLastDbVersion, insertDBVersion, updateDBVersion}