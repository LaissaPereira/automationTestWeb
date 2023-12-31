import { APIRequestContext, expect } from '@playwright/test'
import { TaskModel } from '../fixtures/task.model'
import 'dotenv/config'

const BASE_API = process.env.BASE_API

export async function deleteTaskByHelper(request: APIRequestContext, taskName:string){
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
}
export async function createTaskByHelper(request: APIRequestContext, taskName: TaskModel){
    const newTask = await request.post(`${BASE_API}/tasks`, {data: taskName})
    expect(newTask.ok()).toBeTruthy() 
}