export function redirectOnCondition(condition, path = "/") {
    if (condition) {
        window.location = path;
    }
}