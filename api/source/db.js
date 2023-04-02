const sqlite = require('better-sqlite3');

class Db{
    constructor(filename) {
        this.filename = filename;
        this.db = new sqlite(filename, { verbose: console.log });

        this.db.exec('DROP TABLE IF EXISTS cities');
        this.db.exec(
        `CREATE TABLE cities 
        (id TEXT PRIMARY KEY, name TEXT NOT NULL, weather TEXT NOT NULL)`);

        this.Seed();
    }

    GetCities(){
        return this.db.prepare(`SELECT * FROM cities`).all();
    }

    GetCity(id){
        let city = null;
        
        const rows = this.db.prepare(`SELECT * FROM cities WHERE id = '${id}'`).all();
        if(rows.length == 1){
            city = rows[0];
        }
        else if(rows.length > 1){
            throw new Error(`Multiple posts found with id ${id}`);
        } 

        return city;
    }

    AddCity(id, name, weather){
        const stmt = this.db.prepare('INSERT OR REPLACE INTO cities (id, name, weather) VALUES (?, ?, ?)'); 
        stmt.run(id, name, weather);
    }

    Seed(){
        this.AddCity('cracov', 'Kraków', 'rainy');
        this.AddCity('warsaw', 'Warszawa', 'cloudy');
        this.AddCity('gdansk', 'Gdańsk', 'sunny');
        this.AddCity('starachowice', 'Starachowice', 'zenithal-rains');
    }
}

module.exports = {
    Db
}