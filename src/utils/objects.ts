export const deepClone = (object: Record<string, unknown>) => JSON.parse(JSON.stringify(object))

export const updateObject = (
    oldObject: Record<string, unknown>,
    key: string,
    updateValue: string | Record<string, unknown>
): Record<string, unknown> => {
    if (key in oldObject) {
        return {
            ...oldObject,
            [key]: updateValue,
        };
    }

    let updatedObject = { ...oldObject };

    for (const prop in oldObject) {
        if (
            oldObject[prop] !== null &&
            typeof oldObject[prop] === "object" &&
            !Array.isArray(oldObject[prop])
        ) {
            updatedObject = {
                ...updatedObject,
                [prop]: updateObject(
                    oldObject[prop] as Record<string, unknown>,
                    key,
                    updateValue
                ),
            };
        }
    }

    return updatedObject;
};
