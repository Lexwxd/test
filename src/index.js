import express from "express";

import { todoRouter } from "./controllers/todo.js";
// создаем объект приложения
const app = express();
app.use(express.json({ limit: '1mb' }));
// определяем обработчик для маршрута "/"

const errorHandling = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        msg: "Ошибка обработана"
    })
}

app.use('/todo', todoRouter)
app.use(errorHandling)
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);


