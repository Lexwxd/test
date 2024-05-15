import express from "express";
// создаем объект приложения
const app = express();
app.use(express.json());
// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);