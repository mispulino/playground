// Tester assingment for Productboard! From Misa (https://github.com/mispulino) in Cypress.io
// Find "how to" in readme.md 

describe('TodoMVC - playground', () => {

  let TODO_ONE = 'Wash dishes'
  // let TODO_TWO = 'Take a dog for a walk'
  let TODO_THREE = 'Take a nap'

  beforeEach(() => {
    cy.visit('/')
  })

  context('Clear completed button', () => {
    beforeEach(() => {
      cy.createDefaultTodos().as('todos')
    })

    it('Display the correct text', () => {
      cy.get('@todos').eq(0).find('.toggle').check()
      cy.get('.clear-completed').contains('Clear completed')
    })

    it('Remove completed items when clicked', () => {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.clear-completed').click()
      cy.get('@todos').should('have.length', 2)
      cy.get('@todos').eq(0).should('contain', TODO_ONE)
      cy.get('@todos').eq(1).should('contain', TODO_THREE)
    })

    it('should be hidden when there are no items that are completed', () => {
      cy.get('@todos').eq(1).find('.toggle').check()
      cy.get('.clear-completed').should('be.visible').click()
      cy.get('.clear-completed').should('not.exist')
    })
  })
})
