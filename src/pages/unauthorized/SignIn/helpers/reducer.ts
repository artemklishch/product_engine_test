import { lengthValidate } from "../../../../utils/validations";

export const USERNAME_ACTION = "USERNAME_ACTION"
export const PASSWORD_ACTION = "PASSWORD_ACTION"

export const usernameLengthValidation = lengthValidate(3, 255)
export const passwordLengthValidation = lengthValidate(3, 10)

type ReducerValue = {
    value: string;
    error: string | false;
}
export type ReducerState = {
    username: ReducerValue;
    password: ReducerValue
}
export type ReducerAction = { type: "USERNAME_ACTION" | "PASSWORD_ACTION", payload: string }
export const initialValues: ReducerState = {
    username: {
        value: "",
        error: false,
    },
    password: {
        value: "",
        error: false
    }
}

export const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
    switch (action.type) {
        case USERNAME_ACTION: {
            const validationValue = usernameLengthValidation(action.payload);
            return { ...state, username: { value: action.payload, error: validationValue } }
        }
        case PASSWORD_ACTION: {
            const validationValue = passwordLengthValidation(action.payload);
            return { ...state, password: { value: action.payload, error: validationValue } }
        }
        default: return state;
    }
}