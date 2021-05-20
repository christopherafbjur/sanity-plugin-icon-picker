import React from "react";
import { toCamel } from "../../utils/helpers";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faIcons from "@fortawesome/free-solid-svg-icons";
import iconList from "./icons";

const libList = iconList.map((item) => faIcons[toCamel("fa-" + item)]);
const iconStyle = { width: "20px", height: "20px", fontSize: "20px" };

library.add(...libList);

export default function (provider) {
  return () =>
    iconList.map((name) => {
      return {
        provider,
        name,
        component: () => (
          <FontAwesomeIcon style={iconStyle} icon={name}></FontAwesomeIcon>
        ),
      };
    });
}
