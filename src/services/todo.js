import axios from "axios";
import { mysqlConnect } from "../utils/dbconnect.js";

export class TodoService {

    static async readAll() {
        const dbquery = await mysqlConnect.execute('SELECT * FROM `images`')
        return dbquery[0]
    }

    static async create(base64image) {
        const form = new FormData();
        form.append('base64Image',base64image);
        form.append('OCREngine', 2);

        const response = await axios.post('https://api.ocr.space/parse/image', form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                apikey: 'K84027395688957'
            },
        })

        const parsedSymbols = response.data.ParsedResults[0].ParsedText
        await mysqlConnect.execute('INSERT INTO `images`(original_image,parsed_text) VALUES(?,?)', 
        [base64image, parsedSymbols])
        return parsedSymbols
    }

    static async patch(id) {
        await mysqlConnect.execute('UPDATE `images` SET is_parsed_correctly = true WHERE id = ?', [id])
    }

    static async delete(id) {
        await mysqlConnect.execute('DELETE FROM `images` WHERE `id` = ?', [id])
    }

}