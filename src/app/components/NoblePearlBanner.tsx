import { getImageProps } from "next/image";
import Link from "next/link";

const ALT =
  "Junkyard x Noble Pearl Showroom: park your listed car on our showroom floor. 4.5% commission for Junkyard sellers. Port Bell Rd, Bugolobi, Kampala.";

const NoblePearlBanner = () => {
  const {
    props: { srcSet: desktopSrcSet, sizes: desktopSizes },
  } = getImageProps({
    alt: ALT,
    src: "/partners/noble-pearl-banner-desktop.png",
    width: 3000,
    height: 600,
    sizes: "100vw",
  });

  const {
    props: { srcSet: mobileSrcSet, sizes: mobileSizes, ...mobileImgProps },
  } = getImageProps({
    alt: ALT,
    src: "/partners/noble-pearl-banner-mobile.png",
    width: 1500,
    height: 1800,
    sizes: "100vw",
  });

  return (
    <section className="pt-8 md:pt-20">
      <Link href="/dashboard" aria-label="Park your listed car on the Noble Pearl showroom floor">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes={desktopSizes} />
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes={mobileSizes} />
          <img
            {...mobileImgProps}
            alt={ALT}
            className="block aspect-[5/6] h-auto w-full md:aspect-[5/1]"
          />
        </picture>
      </Link>
    </section>
  );
};

export default NoblePearlBanner;
