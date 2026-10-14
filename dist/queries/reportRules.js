export function qaToDone(transitions) {
    return transitions.filter((t) => t.fromStatus === "In QA" &&
        t.toStatus === "Done");
}
export function enteredQa(transitions) {
    return transitions.filter((t) => t.toStatus === "In QA");
}
export function prToDone(transitions) {
    return transitions.filter((t) => t.fromStatus === "PR" &&
        t.toStatus === "Done");
}
