import React from "react";
import style from "./index.module.scss";
import Image from "next/image";
const index = () => {
  return (
    <div className={`${style.bg} ${style.flex}`}>
      <div className={style.left}>
        <div className={style.logo}><Image src={"https://logovectorseek.com/wp-content/uploads/2020/02/demos-logo-vector.png"}alt="pic"></Image></div>
      </div>
      <div className={style.right}>hello</div>
    </div>
  );
};

export default index;
