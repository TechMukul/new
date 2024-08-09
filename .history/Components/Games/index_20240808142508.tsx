import Image from 'next/image'
import React from 'react'
import style from './index.module.scss'
import Link from 'next/link'
const index = () => {
  return (
    <div className={`${style.bg} ${style.flex}`}>
    <h1>POPULAR GAMES</h1>
    <div className={style.cardContainer}>
      <Link href={"Skintypes"}>
      <div className={style.card}>
        {/* <Link href={"Skintypes"} style={{textDecoration:"none"}}> */}
        <Image
          className={style.img}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrCQgfD9QCHTWN1ive5HhFoXB0qncPEJ26g&s"
          }
          width={250}
          height={280}
          // layout="fill" // Cover the container
          // objectFit="cover" // Ensure the image covers the container
          // priority
          alt="pic"
        ></Image>

        <h1>RISE OF CASTLES</h1>
        {/* </Link> */}
      </div>
      </Link>
      <div className={style.card}>
        <Image
          className={style.img}
          src={
            "https://i.pinimg.com/736x/e8/7f/d6/e87fd686a3e9053b4d4bc5b0277dcf72.jpg"
          }
          width={250}
          height={280}
          // layout="fill" // Cover the container
          // objectFit="cover" // Ensure the image covers the container
          // priority
          alt="pic"
        ></Image>

        <h1>CLASH OF CLANS</h1>
      </div>
      <div className={style.card}>
        <Image
          className={style.img}
          src={
            "https://assets-prd.ignimgs.com/2022/05/27/clashroyale-1653673820137.jpg"
          }
          width={250}
          height={280}
          // layout="fill" // Cover the container
          // objectFit="cover" // Ensure the image covers the container
          // priority
          alt="pic"
        ></Image>

        <h1>CLASH OF ROYALE</h1>
      </div>
      <div className={style.card}>
        <Image
          className={style.img}
          src={
            "https://cdn.mos.cms.futurecdn.net/fhMAcwcNZavsrQ7nPHZvXh.jpg"
          }
          width={250}
          height={280}
          // layout="fill" // Cover the container
          // objectFit="cover" // Ensure the image covers the container
          // priority
          alt="pic"
        ></Image>

        <h1>RISE OF CASTLES</h1>
      </div>
    </div>
  </div>
  )
}

export default index
