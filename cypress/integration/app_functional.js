// Tester assingment for Productboard! From Misa (https://github.com/mispulino) in Cypress.io
// Find "how to" in readme.md 

describe('TodoMVC - playground', () => {

  let TODO_ONE = 'Wash dishes'
  let TODO_TWO = 'Take a dog for a walk'
  let TODO_THREE = 'Take a nap'

  beforeEach( () => {
    cy.visit('/')
  })

  context('First load', () => {
    it('Todo input is visible', () => {
      cy.focused().should('have.class', 'new-todo')
    })
  })

  context('Clear view', () => {
    it('No todos visible', () => {
      cy.get('.todo-list li').should('not.exist')
    })
  })

  context('Operations with items', () => {
    it('Mark as completed', () => {
      // custom command 'createTodo'
      cy.createTodo(TODO_ONE).as('firstTodo')
      cy.createTodo(TODO_TWO).as('secondTodo')

      cy.get('@firstTodo').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')

      cy.get('@secondTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').find('.toggle').check()

      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('have.class', 'completed')
    })

    it('Unmark completed items', () => {
      cy.createTodo(TODO_ONE).as('firstTodo')
      cy.createTodo(TODO_TWO).as('secondTodo')

      cy.get('@firstTodo').find('.toggle').check()
      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')

      cy.get('@firstTodo').find('.toggle').uncheck()
      cy.get('@firstTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')
    })

    it('Edit an item', () => {
      // custom command 'createDefaultTodos'
      cy.createDefaultTodos().as('todos')
      cy.get('@todos').eq(1).as('secondTodo')
      .find('label').dblclick()
      cy.get('@secondTodo').find('.edit').clear()
      .type('Clean the house').type('{enter}')
      cy.get('@todos').eq(0).should('contain', TODO_ONE)
      cy.get('@secondTodo').should('contain', 'Clean the house')
      cy.get('@todos').eq(2).should('contain', TODO_THREE)
    })

    it('Delete all items', () => {
      cy.createDefaultTodos().as('todos')
      cy.get('.todo-list li .destroy').invoke('show').click({multiple : true})
      cy.get('.todo-list li').should('not.exist')
    })
  })

  context('Counter of items', () => {
    it('Displays the current number of items', () => {
      cy.createTodo(TODO_ONE)
      cy.get('.todo-count').contains('1 item left')
      cy.createTodo(TODO_TWO)
      cy.get('.todo-count').contains('2 items left')
    })
  })
})
