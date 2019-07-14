
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createDefaultTodos', () => {

  let TODO_ONE = 'Wash dishes'
  let TODO_TWO = 'Take a dog for a walk'
  let TODO_THREE = 'Take a nap'

  let cmd = Cypress.log({
    name: 'create default todos',
    message: [],
    consoleProps () {
      return {
        'Inserted Todos': [TODO_ONE, TODO_TWO, TODO_THREE],
      }
    },
  })

  cy.get('.new-todo', {log: false})
  .type(`${TODO_ONE}{enter}`, {log: false})
  .type(`${TODO_TWO}{enter}`, {log: false})
  .type(`${TODO_THREE}{enter}`, {log: false})

  cy.get('.todo-list li', {log: false})
  .then(function ($listItems) {
    cmd.set({ $el: $listItems }).snapshot().end()
  })
})

Cypress.Commands.add('createTodo', function (todo) {

  let cmd = Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps () {
      return {
        'Inserted Todo': todo,
      }
    },
  })

  cy.get('.new-todo', {log: false}).type(`${todo}{enter}`, {log: false})
  cy.get('.todo-list', {log: false})
  .contains('li', todo.trim(), {log: false})
  .then(function ($li) {
    cmd.set({ $el: $li }).snapshot().end()
  })
})