import { infoConstants } from "../constants"

const initialState = { info: {},property:{} }

export const infoUserreducer = (state = initialState, action) => {
    switch (action.type) {
        case infoConstants.INFO:
            return {
                info:action.data,
                property:state.property
            }
        case infoConstants.PROPERTY:
            return {
                info:state.info,
                property:action.data
            }
        default:
            return state
    }
}
