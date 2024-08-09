import Image from "next/image";
import React, { useEffect } from "react";
import style from "./index.module.scss";
import Link from "next/link";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger animation when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.inView);
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    document.querySelectorAll(`.${style.card}`).forEach((card) => {
      observer.observe(card);
    });
  }, []);

  return (
    <div className={`${style.bg} ${style.flex}`}>
      <h1>POPULAR GAMES</h1>
      <div className={style.cardContainer}>
        {[
          {
            href: "Skintypes",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShrCQgfD9QCHTWN1ive5HhFoXB0qncPEJ26g&s",
            alt: "RISE OF CASTLES"
          },
          {
            href: "Skintypes",
            src: "https://i.pinimg.com/736x/e8/7f/d6/e87fd686a3e9053b4d4bc5b0277dcf72.jpg",
            alt: "CLASH OF CLANS"
          },
          {
            href: "Skintypes",
            src: "https://assets-prd.ignimgs.com/2022/05/27/clashroyale-1653673820137.jpg",
            alt: "CLASH OF ROYALE"
          },
          {
            href: "Skintypes",
            src: "https://cdn.mos.cms.futurecdn.net/fhMAcwcNZavsrQ7nPHZvXh.jpg",
            alt: "RISE OF CASTLES"
          }
        ].map((item, index) => (
          <div className={style.card} key={index}>
            <Link href={item.href} className={style.links}>
              <Image
                className={style.img}
                src={item.src}
                width={250}
                height={280}
                alt={item.alt}
              />
              <h1>{item.alt}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
