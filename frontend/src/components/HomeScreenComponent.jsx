import { Button, Card, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const HomeScreenComponent = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="text-center border-0 shadow">
          <Card.Header>User Management Using React</Card.Header>
          <Card.Body>
            <Card.Title className="text-danger"><strong>User mangement</strong></Card.Title>
            {userInfo ? (
              <>
                <Card.Text>
                  <h5>Name:{userInfo.name}</h5>
                  <h5>Email:{userInfo.email}</h5>
                  <h5>Phone Number:{userInfo.phone}</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum inventore labore saepe at repellendus nisi minus laborum beatae aperiam? Earum aliquam fugiat minima cupiditate? Maxime enim expedita aliquid veniam sit?
                  Inventore dicta nam nisi maiores exercitationem optio velit, distinctio fugiat impedit iste qui pariatur expedita voluptatum sequi quasi quisquam nihil illum quis minima voluptates unde! Sit laudantium libero culpa quidem?</p>
                </Card.Text>
              </>
            ) : (
              <>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat, qui debitis non illo quam totam aut accusamus aliquam
                  earum culpa error fuga dolores molestiae amet magnam, sequi
                  quidem. Animi, quidem! Quibusdam commodi pariatur rerum
                  officiis mollitia delectus velit id error nesciunt laudantium
                  aliquam labore quos consectetur ullam nulla, nam sit
                  perspiciatis sapiente quidem, asperiores aliquid quisquam sunt
                  in? Tenetur, labore. Hic amet soluta iste maxime
                  necessitatibus fuga, similique cum, itaque eius, eligendi
                  dolorem illo? Commodi tempora, corrupti non dolorem unde
                  provident quisquam quidem voluptatem officiis eligendi maxime
                  eaque blanditiis exercitationem?
                </Card.Text>
                <span>
                  <div className="d-flex justify-content-center gap-2">
                    <LinkContainer to="/login">
                      <Button variant="primary">Sign In</Button>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Button variant="secondary">Register</Button>
                    </LinkContainer>
                  </div>
                </span>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default HomeScreenComponent;
