/* eslint no-undef: "off" */
const { makeTodoListItem, patchTodoListItem } = require('../api/entities/todoListItems/')

require('dotenv').config()
process.env.NODE_ENV = 'test'

describe('[CASE 1] Test MakeTodoListItem', () => {
  test('should create a new todo list item if valid payload', () => {
    const payload = {
      description: 'First todo list item',
      todoListId: '1',
      addedBy: '1'
    }
    const todoListItem = makeTodoListItem(payload)
    const newTodoListItem = {
      description: todoListItem.getDescription(),
      addedBy: todoListItem.getUserId(),
      todoListId: todoListItem.getTodoListId()
    }
    expect(todoListItem).not.toBeNull()
    expect(newTodoListItem).not.toBeNull()
    expect(newTodoListItem).toEqual(payload)
  })
  test('sets isDone field to false by default', () => {
    const payload = {
      description: 'First todo list item',
      todoListId: '1',
      addedBy: '1'
    }
    const todoListItem = makeTodoListItem(payload)
    const expected = false
    const actual = todoListItem.getIsDone()
    expect(expected).toEqual(actual)
  })
})

describe('[CASE 2] Test MakeTodoListItem', () => {
  test('throws error if description field is missing', async () => {
    try {
      const payload = {
        todoListId: '1',
        addedBy: '1'
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "description" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if description field is empty', async () => {
    try {
      const payload = {
        description: '',
        todoListId: '1',
        addedBy: '1'
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "description" cannot be an empty field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if description field is not a string', async () => {
    try {
      const payload = {
        description: 12345678,
        todoListId: '1',
        addedBy: '1'
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "description" should be a type of \'text\''
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 3] Test MakeTodoListItem', () => {
  test('throws error if addedBy field is missing', async () => {
    try {
      const payload = {
        description: 'First todo list item',
        todoListId: '1'
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if addedBy field is not a number', async () => {
    try {
      const payload = {
        description: 'First todo list item',
        todoListId: '1',
        addedBy: '1'
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 1] Test PatchTodoListItem', () => {
  test('should update a todo list item (description, isDone fields) if valid payload', () => {
    // Make payload to create new todo list item
    const makePayload = {
      description: 'First todo list item',
      todoListId: '1',
      addedBy: '1'
    }
    const prevTodoListItem = makeTodoListItem(makePayload)
    const MakeTodoListItem = {
      description: prevTodoListItem.getDescription(),
      addedBy: prevTodoListItem.getUserId(),
      todoListId: prevTodoListItem.getTodoListId(),
      isDone: prevTodoListItem.getIsDone() // false by default
    }
    // Patch payload to update todo list item (update description & isDone)
    const patchPayload = {
      id: '1',
      description: 'Update todo list item',
      todoListId: '1',
      addedBy: '1',
      isDone: true
    }
    const updatedTodoListItem = patchTodoListItem(patchPayload)
    const PatchTodoListItem = {
      id: updatedTodoListItem.getId(),
      description: updatedTodoListItem.getDescription(),
      todoListId: updatedTodoListItem.getTodoListId(),
      addedBy: updatedTodoListItem.getUserId(),
      isDone: updatedTodoListItem.getIsDone()
    }
    expect(PatchTodoListItem).not.toBeNull()
    expect(MakeTodoListItem.description).not.toBe(PatchTodoListItem.description)
    expect(PatchTodoListItem.description).toBe(patchPayload.description)
    expect(MakeTodoListItem.isDone).not.toBe(PatchTodoListItem.isDone)
    expect(PatchTodoListItem).toEqual(patchPayload)
  })
})

describe('[CASE 2] Test PatchTodoListItem', () => {
  test('throws error if id field is missing', async () => {
    try {
      const payload = {
        description: 'Update todo list item',
        todoListId: '1',
        addedBy: '1',
        isDone: false
      }
      await patchTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "id" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if id field is not a number', async () => {
    try {
      const payload = {
        id: '1',
        description: 'Update todo list item',
        todoListId: '1',
        addedBy: '1',
        isDone: true
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. \'"addedBy" is a required field\''
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 3] Test PatchTodoListItem', () => {
  test('throws error if addedBy field is missing', async () => {
    try {
      const payload = {
        id: '1',
        description: 'Update todo list item',
        todoListId: '1',
        isDone: true
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if addedBy field is not a number', async () => {
    try {
      const payload = {
        id: '1',
        description: 'Update todo list item',
        todoListId: '1',
        addedBy: '1',
        isDone: true
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "addedBy" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
})

describe('[CASE 3] Test PatchTodoListItem', () => {
  test('throws error if todoListId field is missing', async () => {
    try {
      const payload = {
        id: '1',
        description: 'Update todo list item',
        addedBy: '1',
        isDone: true
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "todoListId" is a required field'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if todoListId field is not a number', async () => {
    try {
      const payload = {
        id: '1',
        description: 'Update todo list item',
        todoListId: '1',
        addedBy: '1',
        isDone: true
      }
      await makeTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "todoListId" must be a number'
      expect(error).toStrictEqual(err)
    }
  })
  test('throws error if todoListId field is empty', async () => {
    try {
      const payload = {
        id: '1',
        description: 'Update todo list item',
        todoListId: '',
        addedBy: '1',
        isDone: true
      }
      await patchTodoListItem(payload)
    } catch (error) {
      const err = new Error()
      err.name = 'ValidationError'
      err.message = 'Invalid data in TodoListItem entity. "todoListId" must be a number'
      expect(error).toStrictEqual(err)
    }
  })
})
