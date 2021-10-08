import style from './image.module.css';
import NextImage from 'next/image';

export interface ImageProps {
  className?: string;
  alt: any;
  src: string;
  width?: number;
  height?: number;
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
}

const Image = ({
  className,
  src,
  width,
  height,
  alt,
  layout,
  ...props
}: ImageProps) => (
  <div className={style.imgContainer}>
    <NextImage
      width={width}
      height={height}
      src={src}
      layout={layout}
      alt={alt}
      {...props}
      className={`${className} ${style.img}`}
    />
  </div>
);

export default Image;
