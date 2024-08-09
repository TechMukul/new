import React from "react";
import style from './index.module.scss'
const index = () => {
  return (
    <div className={`${style.bg} ${style.flex}`}>
      <div className={style.left}>hello</div>
      <div className={style.right}>hello</div>
    </div>
  );
};

export default index;
