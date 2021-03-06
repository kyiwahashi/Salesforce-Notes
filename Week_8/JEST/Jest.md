## Unit testing vs End-to-end testing
[DOCS Reference](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.testing_dom_api)

unit - one slice of cake
end-to-end - the whole cake

## Jest
[DOCS Reference](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/testing)

Jest is a JavaScript testing suite used to help ensure our code is robust and working as intended. The primary tool for unit testing our LWC.

To install Jest into our project:
```
sfdx force:lightning:lwc:test:setup
```

## Creating Jest Tests

To make a Jest for a component, we first need the tests folder inside of our component's folder. Our Jest files will be JS files that we create in 
the tests folder the tests folder is included in our project's .forceignore file by default. This means that any Jest tests that we write for our 
components will not be deployed to our orgs as a convention, we end our names of our test files with .test, e.g. exampleTest.test.js. Rather than 
manually creating the tests folder and test files, we can use the SDFX: Create Lightning Web Component Test command palette command. When we run 
this command, we'll choose the parent folder of the main/default/lwc directory that contains the component we're writing a test for as well as the 
component that we're testing. This command will create a tests directory inside of the folder for our chosen component and a test file named 
componentName.test.js.

We could also use the cli
```
sfdx force:lightning:lwc:test:create -f force-app/main/default/lwc/myComponent/myComponent.js
```

## Jest Test Structure

```
import { createElement } from 'lwc';
import ComponentName from 'c/componentName';
describe('c-component-name', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });
    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        const element = createElement('c-component-name', {
            is: ComponentName
        });
        document.body.appendChild(element);
		const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Something');
    });
}
```

Within our test file, we'll begin by importing the component that we're testing as follows 

```
import ComponentName from 'namespace/componentName'; 
```

We'll also import the createElement method from the lwc module, which we can use to create the component in our test setup. Each test suite is 
denoted through a describe block, our call to the describe method takes two parameters - a description for the test suite and an anonymous function 
containing our test suite code. To work our component in our tests, we'll create it with a call to createElement. This method takes two parameters - 
the name of component we're creating and the reference to the imported component as the value for the is property of an object literal. Within our 
test suites, we use it or test methods to denote single tests. Each it or test method call takes two parameters - a description for the test and an 
anonymous function containg our test code. Once we've instantiated the component that we're testing in our test blocks, we can insert it into the 
DOM by calling the appendChild() method on the document object. To make an assert statement, we call the expect method using one of the Jest 
framework's matchers (e.g. the toBe() matcher to test equality). We can perform setup and cleanup for our test suites through calls to the 
beforeEach() and afterEach() methods. These methods take a single parameter - an anonymous function containing the code to execute before or 
after each test method within the suite. 

If we want to work with the contents of a component that we've inserted into the DOM, we'll call 
the querySelector() method on its shadowRoot property. It's a test-only API that lets you peek across the shadow boundary to inspect a 
component???s shadow tree. It???s the test equivalent of this.template.

[DOCS for Jest, Jest Matchers](https://jestjs.io/docs/using-matchers)

## Running Tests

We can run tests through npm with npm run test:unit command. If we run this command from a component folder, only the tests for that LWC will be 
executed. If we run this command from the root folder of our SFDX project, all tests within the project will be executed. We can also run our test 
files within Visual Studio Code through the use of the Salesforce Extension Pack.

## Testing Components that Use the Wire Service
[DOCS Reference](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.unit_testing_using_wire_utility)