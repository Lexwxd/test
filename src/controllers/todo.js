import express from "express";
import { TodoService } from "../services/todo.js";
import { asyncHandler, requireToken } from "../middlewares/middleware.js";
import Joi from "joi";
export const todoRouter = express.Router()

todoRouter.get("/", asyncHandler(async function (request, response) {
    const resp = await TodoService.readAll()
    response.status(200).json({ data: resp })
}));

todoRouter.post("/", asyncHandler(async function (request, response) {
    const parsedText = await TodoService.create(request.body.data)
    response.status(200).json({ data: parsedText })
}));

todoRouter.patch("/:id", asyncHandler(async function (request, response) {
    await TodoService.patch(request.params.id)
    response.status(200).json({ data: 'ok' })
}));

todoRouter.delete("/:id", asyncHandler(async function (request, response) {
    await TodoService.delete(request.params.id)
    response.status(200).json({ data: 'ok' })
}));

