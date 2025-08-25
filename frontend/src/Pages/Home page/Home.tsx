import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import "./home.css"; // import custom styles
import Footer from "../../Components/Footer/Footer";

import img1 from "../../assets/people/me.jpeg";

// Slider images
import sliderImg1 from "../../assets/sliders/sider1.png";
import sliderImg2 from "../../assets/sliders/sider2.jpg";
import sliderImg3 from "../../assets/sliders/sider3.jpg";


interface Tutor {
  id: number;
  name: string;
  subject: string;
  experience: string;
  description: string;
  image: string;
}

const tutors: Tutor[] = [
  {
    id: 1,
    name: "Dr. Nimal Perera",
    subject: "Physics",
    experience: "15+ years",
    description:
      "Specialist in A/L Physics with a proven track record of producing top results.",
    image: img1,
  },
  {
    id: 2,
    name: "Ms. Sanduni Fernando",
    subject: "Mathematics",
    experience: "10+ years",
    description:
      "Expert in O/L & A/L Mathematics, simplifying complex concepts for students.",
    image: img1,
  },
  {
    id: 3,
    name: "Mr. Chaminda Silva",
    subject: "Biology",
    experience: "12+ years",
    description:
      "Passionate about teaching Biology with engaging methods and real-world examples.",
    image: img1,
  },
];

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <h1>Welcome to EduLanka</h1>
        <p className="lead">
          Empowering Sri Lankan students with world-class online education
        </p>
      </div>

      

      <Container className="my-5">
        {/* Vision & Mission */}
        <Row className="mb-5">
          <Col md={6}>
            <h2 className="fw-bold">Our Vision</h2>
            <p>
              To be Sri Lanka’s leading online education platform, delivering
              knowledge through trusted tutors and innovative learning methods.
            </p>
          </Col>
          <Col md={6}>
            <h2 className="fw-bold">Our Mission</h2>
            <p>
              To connect students with highly qualified tuition masters, foster
              academic excellence, and make education accessible across the
              nation.
            </p>
          </Col>
        </Row>

        {/* Excellence in Education */}
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="fw-bold">Excellence in Online Education</h2>
            <p className="text-muted">
              Our platform ensures top-quality tutors, interactive sessions, and
              personalized learning experiences to help students reach their
              full potential.
            </p>
          </Col>
        </Row>

        {/* Carousel Section */}
      <Carousel className="my-4" fade interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderImg1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Quality Education</h3>
            <p>Learn from the best tutors in Sri Lanka</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderImg2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Interactive Learning</h3>
            <p>Engage in modern teaching methods</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderImg3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Nationwide Access</h3>
            <p>Education without boundaries</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

        {/* Tutors Section */}
        <Row>
          <h2 className="fw-bold mb-4 text-center">Our Top Tuition Masters</h2>
          {tutors.map((tutor) => (
            <Col key={tutor.id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={tutor.image}
                  alt={tutor.name}
                  className="tutor-img"
                />
                <Card.Body>
                  <Card.Title>{tutor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {tutor.subject} | {tutor.experience}
                  </Card.Subtitle>
                  <Card.Text>{tutor.description}</Card.Text>
                  <Button variant="primary" size="sm">
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
