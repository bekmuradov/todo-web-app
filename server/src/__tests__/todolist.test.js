/* eslint no-undef: "off" */
const { makeTodoList, patchTodoList } = require('../api/entities/todoLists/')

require('dotenv').config()
process.env.NODE_ENV = 'test'

describe('[CASE 1] Test MakeTodoList', () => {
  test('should create a new todolist if valid payload', () => {
    const payload = {
      title: 'First todo list',
      addedBy: '1'
    }
    const todoList = makeTodoList(payload)
    const newTodoList = {
      title: todoList.getTitle(),
      addedBy: todoList.getUserId()
    }
    expect(todoList).not.toBeNull()
    expect(newTodoList).not.toBeNull()
    expect(newTodoList).toEqual(payload)
  })
})

describe('[CASE 2] Test MakeTodoList', () => {
  test('throws error if title field is missing', async () => {
    try {
      const payload = {
        addedBy: '1'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "title" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if title field is empty', async () => {
    try {
      const payload = {
        title: '',
        addedBy: '1'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "title" cannot be an empty field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if title field is not a string', async () => {
    try {
      const payload = {
        title: 12345678,
        addedBy: '1'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "title" should be a type of \'text\''
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 3] Test MakeTodoList', () => {
  test('throws error if addedBy field is missing', async () => {
    try {
      const payload = {
        title: 'new todo list'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if addedBy field is not a number', async () => {
    try {
      const payload = {
        title: 'new todo list',
        addedBy: '1'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 1] Test PatchTodoList', () => {
  test('should update a todolist if valid payload', () => {
    // Make payload to create new todo list
    const makePayload = {
      title: 'new todo list',
      addedBy: '1'
    }
    const prevTodoList = makeTodoList(makePayload)
    const MakeTodoList = {
      title: prevTodoList.getTitle(),
      addedBy: prevTodoList.getUserId()
    }
    // Patch payload to update todo list
    const patchPayload = {
      id: '1',
      title: 'Update todo list',
      addedBy: '1'
    }
    const updatedTodoList = patchTodoList(patchPayload)
    const PatchTodoList = {
      id: updatedTodoList.getId(),
      title: updatedTodoList.getTitle(),
      addedBy: updatedTodoList.getUserId()
    }
    expect(updatedTodoList).not.toBeNull()
    expect(PatchTodoList).not.toBeNull()
    expect(MakeTodoList.title).not.toBe(PatchTodoList.title)
    expect(PatchTodoList.title).toBe(patchPayload.title)
    expect(PatchTodoList).toEqual(patchPayload)
  })
})

describe('[CASE 2] Test PatchTodoList', () => {
  test('throws error if id field is missing', async () => {
    try {
      const payload = {
        title: 'Update todo list',
        addedBy: '1'
      }
      await patchTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "id" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if id field is empty', async () => {
    try {
      const payload = {
        id: '',
        title: 'update todo list',
        addedBy: '1'
      }
      await patchTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "id" must be a number'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if id field is not a number', async () => {
    try {
      const payload = {
        id: '1',
        title: 'update todo list',
        addedBy: '1'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "id" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 3] Test PatchTodoList', () => {
  test('throws error if addedBy field is missing', async () => {
    try {
      const payload = {
        id: '1',
        title: 'Update todo list'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if addedBy field is not a number', async () => {
    try {
      const payload = {
        id: '1',
        title: 'Update todo list',
        addedBy: '1'
      }
      await makeTodoList(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoList entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
})
