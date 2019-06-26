import { AppContext } from "../Context";
import React from "react";

export const withContext = (Component) => {
    return (props) => (
        <AppContext.Consumer>
            {(context) => <Component {...props} context={context}/>}
        </AppContext.Consumer>
    )
};