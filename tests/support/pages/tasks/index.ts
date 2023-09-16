import { Page, expect } from "@playwright/test"
import { TaskModel } from "../../../fixtures/task.model"


export class TasksPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }
    
    async access(){
        await this.page.goto('/')
    }

    async create(taskName : TaskModel){
    const inputTaksName = this.page.locator('#newTask')
    await inputTaksName.fill(taskName.name)

    const buttonSubmit = this.page.locator('button[class*="ButtonNewTask"]')
    await buttonSubmit.click()
    }

    async toggle(taskName : string){
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/../button[contains(@class, "Toggle")]`)
        await target.click()
    }

    async remove(taskName : string){
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/../button[contains(@class, "Delete")]`)
        await target.click()
    }

    async shouldReadText(taskName : string){
        const textTaskName = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(textTaskName).toBeVisible() 
    }

    async shouldBeDone(taskName : string){
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async shouldNotExist(taskName : string){
        const textTaskName = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(textTaskName).not.toBeVisible()
    }
    async alertText(text: string){
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async alertFieldRequired(){
        const inputTaksName = this.page.locator('#newTask')
        const validationMessage = await inputTaksName.evaluate(e => (e as HTMLInputElement).validationMessage)
        await expect(validationMessage).toEqual('This is a required field')
    }
}