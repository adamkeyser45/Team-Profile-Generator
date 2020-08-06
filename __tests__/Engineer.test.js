const Engineer = require('../lib/Engineer');

test('checks Engineer github', () => {
    const engineer = new Engineer('Jim', 1002, 'jim@gmail.com', 'jimgithub');

    expect(engineer.github).toEqual(expect.any(String));
});

test('check getRole to return Engineer', () => {
    const engineer = new Engineer('Jim', 1002, 'jim@gmail.com', 'jimgithub');

    expect(engineer.getRole()).toBe("Engineer");
});

test('checks the retrieval of the github account', () => {
    const engineer = new Engineer('Jim', 1002, 'jim@gmail.com', 'jimgithub');

    expect(engineer.getGithub()).toBe('jimgithub');
});
