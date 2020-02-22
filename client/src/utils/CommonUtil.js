export const cls = classes => {
    return classes.reduce((con, cl) => `${con} ${cl}`);
};