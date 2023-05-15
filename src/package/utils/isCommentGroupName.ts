const commentGroupNames = [
    "position and layout",
    "layout and position",
    "display and visibility",
    "clipping",
    "animation",
    "box model",
    "background",
    "typography",
];

export function isCommentGroupName(commentText: string) {
    return commentGroupNames.includes(commentText.toLowerCase());
}