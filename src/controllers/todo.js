import express from "express";
import { TodoService } from "../services/todo.js";
import { asyncHandler, requireToken } from "../middlewares/middleware.js";
import Joi from "joi";
export const todoRouter = express.Router()

const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(45).required(),
    description: Joi.string().min(2).max(250).required(),
    is_completed: Joi.bool().optional()
})

todoRouter.get("/", asyncHandler(async function (request, response) {
    const resp = await TodoService.readAll()
    response.status(200).json({ data: resp })
}));

todoRouter.post("/", requireToken, asyncHandler(async function (request, response) {
    if(schema.validate(request.body).error){
        response.status(400).json({data:'Кривой запрос'})
    } else{
        await TodoService.create(request.body)
        response.status(200).json({ data: 'ok' })
    }
}));

todoRouter.patch("/:id", requireToken, asyncHandler(async function (request, response) {
    await TodoService.patch(request.params.id)
    response.status(200).json({ data: 'ok' })
}));

todoRouter.delete("/:id", requireToken, asyncHandler(async function (request, response) {
    await TodoService.delete(request.params.id)
    response.status(200).json({ data: 'ok' })
}));

