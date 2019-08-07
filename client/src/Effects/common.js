
//TODO: change this to react router ?
export function redirectOnCondition(condition, path = "/") {
    if (condition) {
        window.location = path;
    }
}