import authReducer, {setAuthenticatedUserData} from "../../src/redux/auth-reducer";

const initialState = {
    authenticatedUserData: {
        id: null,
        email: null,
        login: null
    },
    isAuth: false
}
describe('auth reducer: set authenticated user data', () => {

    let action = setAuthenticatedUserData(1234, "mail@mail.ru", "user", true);
    let newState = authReducer(initialState, action);

    it('set authenticated user id', () => {
        expect(newState.authenticatedUserData.id).toBe(1234);
    })

    it('set authenticated user email', () => {
        expect(newState.authenticatedUserData.email).toBe("mail@mail.ru");
    })

    it('set authenticated user login', () => {
        expect(newState.authenticatedUserData.login).toBe("user");
    })

    it('set authenticated user isAuth status', () => {
        expect(newState.isAuth).toBe(true);
    })
})


