import style from './image.module.css';
import NextImage from 'next/image';

export interface ImageProps {
  className?: string;
  alt: any;
  src: string;
  width: number;
  height: number;
}

const Image = ({
  className,
  src,
  width,
  height,
  alt,
  ...props
}: ImageProps) => (
  <div className={style.imgContainer}>
    <NextImage
      width={width}
      height={height}
      src={src}
      alt={alt}
      {...props}
      className={`${className} ${style.img}`}
    />
  </div>
);

export default Image;
