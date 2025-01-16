export function lengthValidate(min: number, max: number) {
    return (value: string) => {
        if (value.length < min || value.length > max) {
            return `The value should be more then ${min} and less then ${max} characters`
        }
        return false;
    }
}
