import { checkForName } from "./nameChecker";

describe('Testing that checkForName is a function', () => {
    test('Should return function', () =>{
        expect(typeof checkForName).toBe("function");
    });
});

describe('Testing checkForName() for a valid url', () =>{
    const formInput = 'https://www.youtube.com/';
    test('Should be returned with a valid url', () =>{
        const response = checkForName(formInput);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});

