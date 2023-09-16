import { test } from '@playwright/test'
import { TaskModel, MessageModel } from './fixtures/task.model'
import { deleteTaskByHelper, createTaskByHelper } from './support/helpers'
import { TasksPage } from './support/pages/tasks/index'
import data from './fixtures/tasks.json'

test.describe('Testing different scenarios for task', ()=>{

    test('Should be add new task', async ({ page, request }) => {
        const taskName = data.success as TaskModel
    
        await deleteTaskByHelper(request, taskName.name)
        const tasksPage = new TasksPage(page)
        await tasksPage.access()
        await tasksPage.create(taskName)
        await tasksPage.shouldReadText(taskName.name)
    
    
    })
    
    test('Should be not add duplicate task', async ({ page, request }) => {
    
        const taskName = data.duplicate as TaskModel
        const messageDuplicate = data.messageAlert as MessageModel
    
        await deleteTaskByHelper(request, taskName.name)
        await createTaskByHelper(request, taskName)
    
        const tasksPage = new TasksPage(page)
        await tasksPage.access()
        await tasksPage.create(taskName)
        await tasksPage.alertText(messageDuplicate.text)
    
    })
    
    test('Should be a required field', async ({ page }) => {
        const taskName = data.required as TaskModel
        const tasksPage = new TasksPage(page)
        await tasksPage.access()
        await tasksPage.create(taskName)
        await tasksPage.alertFieldRequired()
    
    })
    
    test('Should be update for complete the task', async({page, request})=>{
        const taskName = data.update as TaskModel
    
        await deleteTaskByHelper(request, taskName.name)
        await createTaskByHelper(request, taskName)
    
        const tasksPage = new TasksPage(page)
        await tasksPage.access()
        await tasksPage.toggle(taskName.name)
        await tasksPage.shouldBeDone(taskName.name)
    })
    
    test('Should be delete the task', async({page, request})=>{
        const taskName = data.delete as TaskModel
    
        await deleteTaskByHelper(request, taskName.name)
        await createTaskByHelper(request, taskName)
    
        const tasksPage = new TasksPage(page)
        await tasksPage.access()
        await tasksPage.remove(taskName.name)
        await tasksPage.shouldNotExist(taskName.name)
    
    })

})
