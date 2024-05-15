import { mysqlConnect } from "../utils/dbconnect.js";

export class TodoService{

    static async readAll(){
        const dbquery = await mysqlConnect.execute('SELECT * FROM `tasks`')
        console.log(dbquery)
        return dbquery[0]
    }

    static async create(todo){
        const dbquery = await mysqlConnect.execute('INSERT INTO `tasks`(name,description,is_completed) VALUES(?,?,?)',[todo.name, todo.description, !!todo.is_completed])
        console.log(dbquery)
    }

    static async patch(id){
        const dbquery = await mysqlConnect.execute('UPDATE `tasks` SET is_completed = true WHERE id = ?' ,[id])
    }

    static async delete(id){
        const dbquery = await mysqlConnect.execute('DELETE FROM `tasks` WHERE `id` = ?',[id])
    }

}