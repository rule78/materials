import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Input from "../."; // 此处存在parcel alias 见下文
import "../dist/react-popup.min.css"; // 此处不存在parcel alias 写好相对路径

const App = () => {
  const Textarea = Input.Textarea;
  return (
    <div>
      <Textarea />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));