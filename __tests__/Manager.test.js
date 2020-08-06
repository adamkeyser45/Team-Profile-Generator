const Manager = require('../lib/Manager');
const { TestScheduler } = require('jest');

test('checks Manager office number', () => {
    const manager = new Manager('Jim', 1002, 'jim@gmail.com', 24);

    expect(manager.office).toEqual(expect.any(Number));
});

test('check getRole to return Manager', () => {
    const manager = new Manager('Jim', 1002, 'jim@gmail.com', 24);

    expect(manager.getRole()).toBe("Manager");
});