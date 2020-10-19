import { MDBCarousel, MDBCarouselInner, MDBCarouselItem } from "mdbreact";
import { SponsorisedBlog } from "./sponsorisedBlog";

export const Carousel = ({ posts }) => {
  return (
    <>
      <MDBCarousel
        activeItem={3}
        length={3}
        testimonial
        showControls={true}
        showIndicators={true}
        mobileGesture
        onHoverStop
        slide
        className="mt-5"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <SponsorisedBlog posts={posts[0]} />
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <SponsorisedBlog posts={posts[1]} />
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <SponsorisedBlog posts={posts[2]} />
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </>
  );
};
