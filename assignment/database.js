/* This task is to create a database using file handling in javascript 
 * it should perform all crud operations and try to immitate an actual database 
 * @author Sagar Arora 
*/



// the filehandling will be done through fs library  

import fs from "fs/promises"
import { readdirSync, statSync,rmdirSync,renameSync, rename } from 'fs'
import { error } from "console";

/** The main class where all the operation will be performed
 * 
 */
class Database {
    // variable will store the path of current database and table we are working on
    databasePath;
    tablePath;

    // TODO:utility funnctions


    /**Get the present database path
     * 
     * @returns {Promise<String>} database path
     */
    async getDatabasePath() {
        return await this.databasePath
    }

    /**Get the present table path
     * 
     * @returns {Promise<String>} table path
     */
    async getTablePath() {
        return await this.tablePath
    }

    /** a validation function for database name
     * 
     * @param {String} nameOfDatabase name of database
     * @throws {Error} input is not a string
     * @throws {Error} string contains special characters
     */
    checkForName(nameOfDatabase) {
        // if wrong type of input is given
        if (typeof nameOfDatabase != 'string') {
            return new Error("Name should be a string")
        }
        // if string contain special characters
        const notAllowedCaracters = new RegExp('/^[a-zA-z0-9]+$/')
        if (notAllowedCaracters.test(nameOfDatabase) == false) {
            return new Error("The string should not contain any special sharacter")
        }

    }

    // TODO:create functions


    /** create a new database 
     * @param {String} nameOfDatabase name of database
     * @returns {Promise<{ success: boolean, message: string }>} A Promise that resolves to an object with success and message          properties.
     * @throws {Error} nameofDatabase is not valid
     * @throws {Error} database already exist
     * 
     */
    // create operation for database
    async createDatabase(nameOfDatabase) {


        // check if database already exist
        try {
            await fs.mkdir(nameOfDatabase)
            // console.log("Database Created successfully");
            return { 'success': true, 'message': 'Database Created successfully' }

        }
        catch (error) {
            if (error.code === 'EEXIST') {
                // console.log("Database already exist");
                return { 'success': false, 'message': 'Database already exist' }
            }
            else {
                // console.log("Error creating database",error.message);
                return { 'success': false, ',message': `Error creating database: ${error.message}` }
            }

        }



    }

    /** Use the database for CRUD operation
     * 
     * @param {nameOfDatabase} nameOfDatabase name of your database
     * 
     */
    async useDatabase(nameOfDatabase) {
        //check for validation
        this.checkForName(nameOfDatabase)
        this.databasePath = nameOfDatabase
        try {
            const result = await this.createDatabase(nameOfDatabase)
            if (result.success == true) {
                console.log("Database does not exist: " + result.message);
            }
            console.log("Using database: " + nameOfDatabase);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    /**create new table
     * 
     * @param {string} nameOfTable name of table
     * @throws {Error} nameOfTable parameter not valid
     * @throws {Error} table already exist
     */
    // create operation for a table
    async createTable(nameOfTable) {
        // check for string validity
        this.checkForName(nameOfTable)


        //get the name of database 
        let currentDatabasePath = await this.getDatabasePath()



        // create path for new table
        let currentTablePath = `${currentDatabasePath}\\${nameOfTable}.txt`

        // add the final path 
        this.tablePath = currentTablePath

        // check if table already exist
        try {
            await fs.access(currentTablePath)
            console.log(`Table ${nameOfTable} already exist`);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                const lines = []
                for (let i = 1; i <= 10; i++) {
                    lines.push(`${i}:`)
                }
                const fileContent = lines.join('\n')
                await fs.writeFile(currentTablePath, fileContent)
                console.log("File created successfully");
            }


            else {
                console.log(error.message);
            }
        }

    }

    /** Crete record 
     * @param {String} contentOfRecord Record you want to enter in database 
     * @param {Number} uniqueKey represent to unique key for each record in table
     * @throws {Error} Record is not a string 
     * @throws {Error} cannot append record in table
     */
    // create operation for a new record
    async createRecord(contentOfRecord, uniqueKey) {
        if (typeof contentOfRecord != 'string') {
            return new Error("Does not support for this kind of record now")

        }
        
        const totalPath = await this.getTablePath()


        // console.log(totalPath);
        try {
            const data = (await fs.readFile(totalPath, 'utf-8')).split('\n')
            const lineIndex = data.findIndex(line => line.startsWith(`${uniqueKey}:`))
            if (lineIndex != -1) {
                data[lineIndex] = `${uniqueKey}: ${contentOfRecord}`
                await fs.writeFile(totalPath, data.join('\n'))
                console.log("record created  successfully");
            }
            else {
                console.log(`line with key ${uniqueKey} not found`);
            }
        }
        catch (err) {
            console.error(err.message);
        }

    }

    //TODO: read funtions


    /** read all tables in a database
     * 
     * @param {String} nameOfTable name of table 
     * @returns {Array} array of tables names in a database
     */
    readAllTables(databasename){
        try {
            // Read the content of the current working directory
            const TablePath = `${databasename}`
            const Tables = readdirSync(TablePath)



            return Tables;
        } catch (error) {
            console.error('Error:', error.message);
            return [];
        }
    }

    /** Reads all the database name present synchronously
     * @throws {Error} cannot read the database
     */
    readDatabases() {
        try {
            // Read the content of the current working directory
            const DatabasesAndTables = readdirSync('./');

            // Filter out only the databases
            const Databases = DatabasesAndTables.filter(database => statSync(database).isDirectory());

            return Databases;
        } catch (error) {
            console.error('Error:', error.message);
            return [];
        }
    }

    /** Read particular record in a table
     * 
     * @param {Number} uniqueKey read the unique record
     * @param {String} tableName name of table whose record to be fetched
     * @returns {String} record
     * @throws {Error} unique key is not valid
     * @throws {Error} cannot read table record
     * @throws {Error} table does not exist
     */
    async readRecords(uniqueKey, tableName) {
        if (uniqueKey > 9 && uniqueKey < 1) {
            return new Error("Not a valid unique key")
        }

        const pathOfTable = `${this.databasePath}/${tableName}.txt`
        
        try {
            const data = (await fs.readFile(pathOfTable, 'utf-8')).split('\n')
            const lineIndex = data.findIndex(line => line.startsWith(`${uniqueKey}:`))
            if (lineIndex != -1) {
                console.log(data[lineIndex]);
                return data[lineIndex]
            }
            else {
                console.log(`line with key ${uniqueKey} not found`);
            }
        }
        catch (err) {
            console.error(err.message);
        }
 



    }

    /** Reads all record in a table
     * 
     * @param {String} tableName name of the table 
     * @returns {String} Record present in table
     * @throws {Error} table does not exost
     */
    async readAllRecords(tableName) {
        const pathOfTable = `${this.databasePath}/${tableName}.txt`
        

        try {
            const data = (await fs.readFile(pathOfTable, 'utf-8')).split('\n')
            console.log(data);

        }
        catch (err) {
            console.error(err.message);
        }


    }

    // TODO:update functions


    /** update record in a table using unique key
     * 
     * @param {Number} uniqueKey Record unique key
     * @param {String} tableName name of the table
     * @param {String} content content you want to insert insted of original
     * @throws {Error} unique key does not exist
     * @throws {Error} table does not exist
     */
    async updateRecord(uniqueKey, tableName, content) {
        if (uniqueKey > 9 && uniqueKey < 1) {
            return new Error("Not a valid unique key")
        }

        const pathOfTable = `${this.databasePath}/${tableName}.txt`
        
        
        try {
            const data = (await fs.readFile(pathOfTable, 'utf-8')).split('\n')
            const lineIndex = data.findIndex(line => line.startsWith(`${uniqueKey}:`))
            if (lineIndex != -1) {
                data[lineIndex] += ` ${content}`
                await fs.writeFile(pathOfTable, data.join('\n'))
                console.log("Updated successfully");
            }
            else {
                console.log(`line with key ${uniqueKey} not found`);
            }
        }
        catch (err) {
            console.error(err.message);
        }


    }
    /**Update database name
     * @param {String} newName new name for database
     * @param {String} oldName current name of database
     * @throws {Error} new name is not valid 
     */
    updateDatabase(oldName,newName){
        this.checkForName(newName)
        try{
            renameSync(oldName,newName)
            console.log(`name updated successfully: Run use ${newName} to start operations` );
        }
        catch(err){
            console.error(err.message);
        }
    }

    //TODO: delete functions


    /**delete a record in a table
     * 
     * @param {Number} uniqueKey Record unique key 
     * @param {String} tableName name of table
     * @throws {Error} table does not exist
     */
    async deleteRecord(uniqueKey, tableName) {
        if (uniqueKey > 9 && uniqueKey < 1) {
            return new Error("Not a valid unique key")
        }
        const pathOfTable = `${this.databasePath}/${tableName}.txt`
        
        try {
            const data = (await fs.readFile(pathOfTable, 'utf-8')).split('\n')
            const lineIndex = data.findIndex(line => line.startsWith(`${uniqueKey}:`))
            if (lineIndex != -1) {
                data[lineIndex] = `${uniqueKey}:`
                await fs.writeFile(pathOfTable, data.join('\n'))
                console.log("Record deleted successfully");
            }
            else {
                console.log(`line with key ${uniqueKey} not found`);
            }
        }
        catch (err) {
            console.error(err.message);
        }




    }

    /** delete a table from database
     * 
     * @param {String} tableName name of the table
     */
    async deleteTable(tableName) {
        const pathOfTable = `${this.databasePath}/${tableName}.txt`
        try {
            await fs.unlink(pathOfTable)
            console.log('table deleted successfully');
        }
        catch(err){
            console.error(err.message);
        }

    }

    /** delete the database
     * @param {String} nameOfDatabase name of database
     * @throws {Error} database does not exist 
     */
    async deleteDatabase(nameOfDatabase){
        if(this.readDatabases().includes(nameOfDatabase)){
            await fs.rm(nameOfDatabase,{recursive:true,force:true})
            console.log(`Database ${nameOfDatabase} deleted successfully`);
        }
        else{
            return new Error(`${nameOfDatabase} does not exist`)
        }

    }
}








let newObj = new Database()
newObj.useDatabase("new")
.then(()=> newObj.createTable("newTable"))

// // console.log(newObj.readAllTables('new'));
.then(()=> newObj.createRecord("Hello",2))
.then(()=> newObj.createRecord("bello",3))
.then(()=> newObj.updateRecord(2,'newTable','Sagar Arora'))
.then(()=>newObj.deleteRecord(2,'newTable'))
// .then(()=>newObj.deleteTable('newTable'))
// .then(()=>newObj.readAllRecords("newTable"))
.then(()=>newObj.readRecords(2,"newTable"))
// .then(()=>newObj.deleteTable('newTable'))
// .then(()=>newObj.deleteDatabase("new"))

// console.log(newObj.readDatabases());

// newObj.useDatabase("Innovapptive")
// .then(()=> newObj.createTable("newJoinee"))
// .then(()=> newObj.createRecord("names of new joinee",1))
// .then(()=> newObj.createRecord("Sagar",2))
// .then(()=> newObj.createRecord("Atharv",3))
// .then(()=> newObj.createRecord("Pranay",4))
// .then(()=> newObj.updateRecord(4,"newJoinee","Pranay Jain"))
// .then(()=> newObj.readAllRecords("newJoinee"))
// .then(()=> newObj.readRecords(4,"newJoinee"))


// newObj.useDatabase("Test")
// .then(()=>newObj.createTable("testTable"))