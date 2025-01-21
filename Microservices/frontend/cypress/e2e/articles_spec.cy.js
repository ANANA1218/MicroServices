/* eslint-disable no-undef */
describe('Test des articles', () => {
    it('Charge la liste des articles', () => {
      cy.visit('/')
      cy.get('.article-list').should('exist')
      cy.get('.article-item').should('have.length.greaterThan', 0)
    })
  })
  