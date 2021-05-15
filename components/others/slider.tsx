import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import SponsoredBlog from './sponsorisedBlog';
import s from './slider.module.css';

export interface SliderProps {
  data: Array<any>;
}

export default function Slider({ data }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<any>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <div className="relative mt-28">
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide">
          <SponsoredBlog posts={data[0]} />
        </div>
        <div className="keen-slider__slide">
          <SponsoredBlog posts={data[1]} />
        </div>
        <div className="keen-slider__slide">
          <SponsoredBlog posts={data[2]} />
        </div>
      </div>
      {slider && (
        <>
          <ArrowLeft
            onClick={(e) => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <ArrowRight
            onClick={(e) => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}
      {slider && (
        <div className="flex justify-center py-2.5 px-0">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx);
                }}
                className={currentSlide === idx ? s.active : s.dot}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function ArrowLeft(props) {
  const disabled = props.disabled ? s.arrowDisabled : '';
  return (
    <svg
      onClick={props.onClick}
      className={`${s.arrow} ${s.arrowLeft} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
}

function ArrowRight(props) {
  const disabled = props.disabled ? s.arrowDisabled : '';
  return (
    <svg
      onClick={props.onClick}
      className={`${s.arrow} ${s.arrowRight} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  );
}
