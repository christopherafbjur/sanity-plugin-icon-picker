import React from "react";

import styles from "framework7-icons";
import iconList from "./icons.js";

const iconStyle = { width: "20px", height: "20px", fontSize: "20px" };

export default function (provider) {
  return () =>
    iconList.map((name) => {
      return {
        provider,
        name,
        component: () => (
          <i className={styles["f7-icons"]} style={iconStyle}>
            {name}
          </i>
        ),
      };
    });
}
