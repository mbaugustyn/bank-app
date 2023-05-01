import React, { useState } from "react";


export function Header(props: { text: string }): JSX.Element {
    return (
        <h1 className="App-header" >
            {props.text}
        </h1>
    );
}