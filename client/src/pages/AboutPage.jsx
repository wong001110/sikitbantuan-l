import { Container } from "react-bootstrap";

export default function AboutPage() {
    return (
        <div>
            <Container fluid className='p-0 position-relative'>
                {/* banner */}
                <img src="/img/aboutusBanner.jpg" className='banner' />
                <div className="overlay d-flex justify-content-center align-items-center flex-column text-white">
                    <h1 className='m-0 text-center'>About Us</h1>
                </div>
            </Container>
            <Container className='py-5 d-flex justify-content-center' id="contact">
                <div>
                    <h2 className="my-5 text-center fw-bold"><span className="text-primary">Give</span> a Little, <span className="text-primary">Help</span> a Lot.</h2>
                    <p className="text-justify fs-4 mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</p>

                </div>
            </Container>
        </div >
    )
}