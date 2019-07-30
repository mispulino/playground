// Cypress playground from Misa (https://github.com/mispulino) in Cypress.io
// Find "how to" in readme.md

describe('My first assingment', () => {

    let TODO_FIRST = 'Clean the house'
    let TODO_ONE = 'Wash dishes'
    let TODO_TWO = 'Take a dog for a walk'
    let TODO_THREE = 'Take a nap'

    beforeEach(() => {
        cy.visit('/')
    })

    context('Input is visible', () => {
        it('Check the input', () => {
            cy.get('.new-todo').should('be.visible')
        })

        context('List can be created', () => {
            it('Write down first step and verify if list was created', () => {
                cy.createTodo(TODO_FIRST).should('be.visible')
            })
            it('Verify if list was created', () => {
                cy.get('.todo-list').should('exist')
            })
        })

        context('Write more steps and verify items', () => {
            beforeEach(() => {
                cy.createDefaultTodos().as('todos')
            })

            it('Write steps', () => {
                cy.get('@todos').eq(0).should('contain', TODO_ONE)
                cy.get('@todos').eq(1).should('contain', TODO_TWO)
                cy.get('@todos').eq(2).should('contain', TODO_THREE)
                cy.get('@todos').should('have.length', 3)
            })

            it('All items should be active', () => {
                cy.get('.selected').contains('All')
            })

            it('Complete one item from the list', () => {
                cy.get('@todos').eq(1).find('.toggle').check()
                cy.get('.clear-completed').click()
                cy.get('@todos').should('have.length', 2)
                cy.get('@todos').eq(0).should('contain', TODO_ONE)
                cy.get('@todos').eq(1).should('contain', TODO_THREE)
            })

            it('Trim text input', function () {
                cy.createTodo(`                        ${TODO_ONE}    `)
                cy.get('.todo-count').contains('4 items left')
            })

            it('Delete one item from the list', () => {
                cy.get('@todos').eq(1).find('.destroy').invoke('show').click()
                cy.get('@todos').should('have.length', 2)
            })
        })
    })

    context('Badumtss', () => {
        it('Imagine the noise', () => {
            cy.get('.new-todo').type('Badumtss!')
            cy.log('All done!')
        })
    })
})

//     it('Verify completed items', () => {
//         cy.contains('Completed').click()
//         cy.get('.todo-count strong').should('have.length', 1)
//     })
//
//     // Click on active items and find two jobs there

//     it('Verify active items', () => {
//         cy.get(':nth-child(2) > a').click()
//         cy.get('#root > div > section > ul').find('li').should('have.length', 3)
//     })
//
//     // Clear all
//     it('Clear all', () => {
// 		cy.get(':nth-child(1) > a').click()
// 		cy.get('input.toggle').click({multiple : true})
// 		cy.get('.clear-completed').click()
// 		})
