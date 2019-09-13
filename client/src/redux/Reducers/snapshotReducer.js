import { SchemaSnapshot } from "../../SchemaBuilder/schemaSnapshot";

export const UPDATE_SNAPSHOT_HISTORY = "UPDATE_SNAPSHOT_HISTORY";
export const INCREASE_INDEX = "INCREASE_INDEX";
export const DECREASE_INDEX = "DECREASE_INDEX";
export const DELETE_FIELD = "DELETE_FIELD";
export const DELETE_FIELD_FROM_PROPERTY = "DELETE_FIELD_FROM_PROPERTY";
export const DELETE_GLBOAL_PROPERTY = "DELETE_GLOBAL_PROPERTY";
export const SWAP_FIELDS = "SWAP_FIELDS";
export const ADD_FIELD = "ADD_FIELD";
export const ADD_GLOBAL = "ADD_GLOBAL";
export const EDIT_FIELD = "EDIT_FIELD";
export const EDIT_GLOBAL = "EDIT_GLOBAL";
export const ADD_PROPERTY = "ADD_PROPERTY";
export const EDIT_PROPERTY = "EDIT_PROPERTY";

const initialState = {
    history: [new SchemaSnapshot()],
    index: 0
};

export default function snapshotReducer(state = initialState, action) {
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
        case SWAP_FIELDS: {
            const currentSnapshot = state.history[state.index];
            if (action.secondIndex >= currentSnapshot.getSchema().fields.length || action.secondIndex < 0) return state;
            const newSnapshot = currentSnapshot.swapFields(action.index, action.secondIndex);
            return updateHistory(state, newSnapshot);
        }
        case ADD_FIELD: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot
                .addField(action.name, action.parser);
            return updateHistory(state, newSnapshot);
        }
        case ADD_GLOBAL: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot
                .addGlobal(action.parser);
            return updateHistory(state, newSnapshot);
        }
        case EDIT_FIELD: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot
                .editField(action.index, action.name, action.parser);
            return updateHistory(state, newSnapshot);
        }
        case EDIT_GLOBAL: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot.editGlobal(action.index, action.parser);
            return updateHistory(state, newSnapshot);
        }
        case ADD_PROPERTY: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot.appendPropertyToField(action.fieldIndex, action.parser);
            return updateHistory(state, newSnapshot);
        }
        case EDIT_PROPERTY: {
            const currentSnapshot = state.history[state.index];
            const newSnapshot = currentSnapshot.editProperty(action.fieldIndex, action.index, action.parser);
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