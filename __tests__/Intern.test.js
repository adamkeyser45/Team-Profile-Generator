const Intern = require('../lib/Intern');

test('checks Intern school', () => {
    const intern = new Intern('Jim', 1002, 'jim@gmail.com', 'State University');

    expect(intern.school).toEqual(expect.any(String));
});

test('check getRole to return Intern', () => {
    const intern = new Intern('Jim', 1002, 'jim@gmail.com', 'State University');

    expect(intern.getRole()).toBe("Intern");
});

test('checks the retrieval of the school', () => {
    const intern = new Intern('Jim', 1002, 'jim@gmail.com', 'State University');

    expect(intern.getSchool()).toBe('State University');
});