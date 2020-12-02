import appReducer, {setIsInitialized} from "./app-reducer";

const state = {
    isInitialized: false
}

it('set value "isInitialized"', () => {
    const action = setIsInitialized(true);
    let newState = appReducer(state, action);

    expect(newState.isInitialized).toBe(true);
})