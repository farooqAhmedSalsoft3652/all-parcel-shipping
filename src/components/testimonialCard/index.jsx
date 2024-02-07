

const TestimonialCard = (props) => {
    const { testimonialimage, name, text } = props.data;
  return (
    <div className="testimonial_card d-flex gap-4 mb-md-0 mb-3 ">
    <div className="flex-shrink-0">
      <img className="img-fluid testimonial_img" src={testimonialimage} alt={true.toString()} />
    </div>
    <div className="flex-grow-1 cutom_height">
      <p className="d-grey-color">
        {text}
      </p>
      <p className="text-black">{name}</p>
    </div>
  </div>
  )
}

export default TestimonialCard