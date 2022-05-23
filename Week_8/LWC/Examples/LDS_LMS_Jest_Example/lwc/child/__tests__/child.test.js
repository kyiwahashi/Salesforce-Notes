import { createElement } from 'lwc';
import Child from 'c/child';

describe('c-child testing suite', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        const element = createElement('c-child', {
            is: Child
        });
        document.body.appendChild(element);




        expect(1).toBe(2);
    });
});