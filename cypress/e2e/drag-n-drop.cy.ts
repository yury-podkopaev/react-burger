/// <reference types="Cypress" />
import ingredient from '../fixtures/ingredient.json';

describe('ingredient modal window', () => {
    beforeEach(()=> {
        cy.visit('http://localhost:3000');
        cy.fixture('ingredient.json').then((json) => {
            const json2 = {...json, type: 'sauce'};
            cy.intercept('GET', '/api/ingredients', {success: true, data: [json, json2]});
        });
        cy.get('.constructor-element_pos_top').as('top-element');
        cy.get('.constructor-element_pos_bottom').as('bottom-element');
        cy.get('div[data-testid="constructor-body"]').as('body');
    });

    it('should drag and drop bun ingredient correctly', () => {
        const dataTransfer = new DataTransfer();
        cy.get('section').first().as('ingredient-card').trigger("dragstart", { dataTransfer });
        cy.get('@top-element').trigger("drop", { dataTransfer });
        cy.get('@top-element').contains(ingredient.name);
        cy.get('@top-element').contains(ingredient.price);
        cy.get('@top-element').first().find('img').should('have.attr', 'src').should('include', ingredient.image_mobile);
        cy.get('@bottom-element').contains(ingredient.name);
        cy.get('@bottom-element').contains(ingredient.price);
        cy.get('@bottom-element').first().find('img').should('have.attr', 'src').should('include', ingredient.image_mobile);
    });
    
    it('should not drag and drop bun to the main constructor', () => {
        const dataTransfer = new DataTransfer();
        cy.get('section').first().as('ingredient-card').trigger("dragstart", { dataTransfer });
        cy.get('@body').trigger("drop", { dataTransfer });
        cy.get('@body').contains(ingredient.name).should('not.exist');
    });

    it('should drag and drop non-bun ingredient correctly', () => {
        const dataTransfer = new DataTransfer();
        cy.get('section').eq(1).as('ingredient-card').trigger("dragstart", { dataTransfer });
        cy.get('@body').trigger("drop", { dataTransfer });
        cy.get('@body').contains(ingredient.name);
        cy.get('@body').contains(ingredient.price);
        cy.get('@body').first().find('img').should('have.attr', 'src').should('include', ingredient.image_mobile);
    });

    it('should not drag and drop non-bun ingredient to the top element', () => {
        const dataTransfer = new DataTransfer();
        cy.get('section').eq(1).as('ingredient-card').trigger("dragstart", { dataTransfer });
        cy.get('@top-element').trigger("drop", { dataTransfer });
        cy.get('@top-element').contains(ingredient.name).should('not.exist');
        cy.get('@bottom-element').contains(ingredient.name).should('not.exist');
    });

    it('should not drag and drop non-bun ingredient to the bottom element', () => {
        const dataTransfer = new DataTransfer();
        cy.get('section').eq(1).as('ingredient-card').trigger("dragstart", { dataTransfer });
        cy.get('@bottom-element').trigger("drop", { dataTransfer });
        cy.get('@top-element').contains(ingredient.name).should('not.exist');
        cy.get('@bottom-element').contains(ingredient.name).should('not.exist');
    });
});
