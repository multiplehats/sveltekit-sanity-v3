describe('Svelte Meta Tags', () => {
	it('Homepage loads', () => {
		cy.visit('/');
		cy.get('h1').should('contain', 'Welcome to SvelteKit');
	});
});
