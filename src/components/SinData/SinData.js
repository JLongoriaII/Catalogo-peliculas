import React from "react";
import { Result, Icon } from "antd";

export default function SinData() {
  return (
    <Result
      icon={<Icon type="meh" />}
      title="No encontramos lo que buscas, puedes volver a intentar."
    />
  );
}
