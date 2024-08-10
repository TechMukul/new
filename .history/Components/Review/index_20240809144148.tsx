import React from 'react'
import style from './index.module.scss'
const Review = () => {
  return (
    <div className={style.caintainer}>
        <div className={style.heading}>
            <h1>Community Ratings</h1>
            <p>Trusted by Sufficent Premium Club</p>
        </div>
        <div className={style.boxes}>
        <div className={style.box}><h1>User1</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur excepturi laboriosam? Alias perspiciatis dicta fuga mollitia dolores exercitationem fugit.</p></div>
        <div className={style.box}><h1>User2</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur excepturi laboriosam? Alias perspiciatis dicta fuga mollitia dolores exercitationem fugit.</p></div>
        <div className={style.box}><h1>User3</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur excepturi laboriosam? Alias perspiciatis dicta fuga mollitia dolores exercitationem fugit.</p></div>
        <div className={style.box}><h1>User4</h1><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tenetur excepturi laboriosam? Alias perspiciatis dicta fuga mollitia dolores exercitationem fugit.</p></div>
        </div>
        
    </div>
  )
}

export default Review
