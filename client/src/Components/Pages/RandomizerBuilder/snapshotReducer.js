export const UPDATE_SNAPSHOT_HISTORY = "UPDATE_SNAPSHOT_HISTORY";
export const INCREASE_INDEX = "INCREASE_INDEX";
export const DECREASE_INDEX = "DECREASE_INDEX";

export function snapshotReducer(state, action) {
    switch (action.type) {
        case UPDATE_SNAPSHOT_HISTORY:
            state.history.splice(state.index + 1);
            return {
                history: [...state.history, action.payload],
                index: state.index + 1
            }
        case INCREASE_INDEX:
            return {
                ...state,
                index: state.index + 1
            }
        case DECREASE_INDEX:
            return {
                ...state,
                index: state.index - 1
            }
        default:
            return state;

    }
}