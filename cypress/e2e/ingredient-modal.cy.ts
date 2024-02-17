/// <reference types="Cypress" />
import ingredient from '../fixtures/ingredient.json';

describe('ingredient modal window', () => {

    const detailsText = 'Детали ингредиента';

    beforeEach(()=> {
        cy.visit('');
        cy.fixture('ingredient.json').then((json) => {
            cy.intercept('GET', '/api/ingredients', {success: true, data: [json]});
        });
    });

    it('should open a modal window with correct data on ingredient click', () => {
        cy.get('section').first().click();
        cy.contains(detailsText);
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
        cy.contains(detailsText);
        cy.get('svg').last().click();
        cy.contains(detailsText).should('not.exist');
    });

    it('should close the window when user clicks outside', () => {
        cy.get('section').first().click();
        cy.contains(detailsText);
        cy.get('body').click(0,0);
        cy.contains(detailsText).should('not.exist');
    });

});
