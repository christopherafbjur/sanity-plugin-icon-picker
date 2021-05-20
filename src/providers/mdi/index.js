import React from "react";
import { toCamel } from "../../utils/helpers";

//Material Design
import * as mdIcons from "@mdi/js";
import MaterialDesignIcon from "@mdi/react";
import iconList from "./icons";
const iconStyle = { width: "20px", height: "20px", fontSize: "20px" };

export default function (provider) {
  return () =>
    iconList.map((name) => {
      const path = mdIcons[toCamel(name)];

      return {
        provider,
        name,
        component: () => <MaterialDesignIcon style={iconStyle} path={path} />,
      };
    });
}
