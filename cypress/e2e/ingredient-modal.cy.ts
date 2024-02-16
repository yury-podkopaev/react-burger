/// <reference types="Cypress" />
import ingredient from '../fixtures/ingredient.json';

describe('ingredient modal window', () => {
    beforeEach(()=> {
        cy.visit('http://localhost:3000');
        cy.fixture('ingredient.json').then((json) => {
            cy.intercept('GET', '/api/ingredients', {success: true, data: [json]});
        });
    });

    it('should open a modal window with correct data on ingredient click', () => {
        cy.get('section').first().click();
        cy.contains('Детали ингредиента');
        cy.contains('Калории, ккал');
        cy.contains(ingredient.calories);
        cy.contains('Белки, г');
        cy.contains(ingredient.proteins);
        cy.contains('Жиры, г');
        cy.contains(ingredient.fat);
        cy.contains('Углеводы, г');
        cy.contains(ingredient.carbohydrates);
        cy.contains(ingredient.name);
        cy.get(`img[alt="${ingredient.name}"]`).last().should('have.attr', 'src').should('include', ingredient.image_large);
    });

    it('should close the window when cross is clicked', () => {
        cy.get('section').first().click();
        cy.contains('Детали ингредиента');
        cy.get('svg').last().click();
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should close the window when user clicks outside', () => {
        cy.get('section').first().click();
        cy.contains('Детали ингредиента');
        cy.get('body').click(0,0);
        cy.contains('Детали ингредиента').should('not.exist');
    });

});
