import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

import "./Error404.scss";

export default function Error404() {
  return (
    <div className="error-404">
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, pagina no encontrada."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    </div>
  );
}
