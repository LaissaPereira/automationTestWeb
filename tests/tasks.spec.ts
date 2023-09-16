import { test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, createTaskByHelper } from './support/helpers'
import { TasksPage } from './support/pages/tasks/index'



test('Should be add new task', async ({ page, request }) => {
    const taskName: TaskModel = {
        name: 'Read a TypeScript book'
    }

    await deleteTaskByHelper(request, taskName.name)
    const user = new TasksPage(page)
    await user.access()
    await user.create(taskName)
    await user.shouldReadText(taskName.name)


})


test('Should be not add duplicate task', async ({ page, request }) => {

    const taskName: TaskModel = {
        name: 'Buy duplicate books',
        is_done: false,
    }
    const messageDuplicate = 'Task already exists!'

    await deleteTaskByHelper(request, taskName.name)
    await createTaskByHelper(request, taskName)

    const user = new TasksPage(page)
    await user.access()
    await user.create(taskName)
    await user.alertText(messageDuplicate)

})
