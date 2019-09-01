export const UPDATE_SNAPSHOT_HISTORY = "UPDATE_SNAPSHOT_HISTORY";
export const INCREASE_INDEX = "INCREASE_INDEX";
export const DECREASE_INDEX = "DECREASE_INDEX";
export const DELETE_FIELD = "DELETE_FIELD";
export const DELETE_FIELD_FROM_PROPERTY = "DELETE_FIELD_FROM_PROPERTY";
export const DELETE_GLBOAL_PROPERTY = "DELETE_GLOBAL_PROPERTY";

export function snapshotReducer(state, action) {
    switch (action.type) {
        case UPDATE_SNAPSHOT_HISTORY:
            return updateHistory(state, action.payload)
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
        case DELETE_FIELD: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot.removeField(action.index);
            return updateHistory(state, newSnapshot);
        }
        case DELETE_FIELD_FROM_PROPERTY: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot
                .removePropertyFromField(action.fieldIndex, action.propertyIndex);
            return updateHistory(state, newSnapshot);
        }
        case DELETE_GLBOAL_PROPERTY: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot.removeGlobal(action.index);
            return updateHistory(state, newSnapshot);
        }
        default:
            return state;

    }
}

function updateHistory(state, newSnapshot) {
    state.history.splice(state.index + 1);
    return {
        history: [...state.history, newSnapshot],
        index: state.index + 1
    }
}