import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import iconList from "./icons";

const iconStyle = { width: "20px", height: "20px", fontSize: "20px" };

library.add(fab);

export default function (provider) {
  return () =>
    iconList.map((name) => {
      return {
        provider,
        name,
        component: () => (
          <FontAwesomeIcon style={iconStyle} icon={["fab", name]}></FontAwesomeIcon>
        ),
      };
    });
}
