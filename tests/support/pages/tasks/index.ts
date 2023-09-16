import { Page, expect } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"


export class TasksPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }
    
    async access(){
        await this.page.goto('http://localhost:3000/')
    }

    async create(taskName : TaskModel){
    const inputTaksName = this.page.locator('#newTask')
    await inputTaksName.fill(taskName.name)

    const buttonSubmit = this.page.locator('button[class*="ButtonNewTask"]')
    await buttonSubmit.click()
    }

    async shouldReadText(taskName : string){
        const textTaskName = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(textTaskName).toBeVisible() 
    }

    async alertText(text: string){
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }
}