import React, { useState } from "react";

export function Header(props: { text: string }): JSX.Element {
  return <div className="App-header">{props.text}</div>;
}
