// unit.test.js

const functions = require('../code-to-unit-test/unit-test.js');

test('The display date is a valid date', () => {
    expect(functions.displayDate()).toBe(true);
});

test('LocalStorage needs to be initally emppty', () => {
    expect(functions.getPostsFromStorage()).toBe('[]');
});
