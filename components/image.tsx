import style from './image.module.css';
import { HTMLAttributes } from 'react';

export interface ImageProps {
  className?: string;
  alt: any;
  src: string;
  props?: HTMLAttributes<HTMLImageElement>;
}

export const Image = ({ className, src, alt, ...props }: ImageProps) => (
  <div className={style.imgContainer}>
    <img
      src={src}
      alt={alt}
      {...props}
      className={`${className} ${style.img}`}
    />
  </div>
);
