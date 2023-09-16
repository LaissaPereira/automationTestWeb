import { APIRequestContext, expect } from '@playwright/test'
import { TaskModel } from '../fixtures/task.model'

export async function deleteTaskByHelper(request: APIRequestContext, taskName:string){
    await request.delete(`http://localhost:3333/helper/tasks/${taskName}`)
}
export async function createTaskByHelper(request: APIRequestContext, taskName: TaskModel){
    const newTask = await request.post('http://localhost:3333/tasks', {data: taskName})
    expect(newTask.ok()).toBeTruthy() 
}