import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const auth = getAuth();

  // Google sign In Method
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Github SignIn
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result);
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Facebook
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider).then((result) => {
      const { displayName, photoURL, email } = result.user;
      console.log(result.user);
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL,
      };
      setUser(loggedInUser);
    });
  };

  // create user using email&&Pass


  // handle event with email and password
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log("Registration Clicked");
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user)
    })
   
  };

  const handleEmail = e =>{
    setEmail(e.target.value)
    
  }

  const handlePassword = e =>{
    setPassword(e.target.value)
  }

  return (
    <div className="container mt-5 ">
      <div className="d-flex">
        <h3>Sign In With</h3>
        <button
          className="btn btn-dark mx-2 d-flex justify-content-center"
          onClick={handleGoogleSignIn}
        >
          
          <FontAwesomeIcon
            icon={faGoogle}
            size="2x"
            className="text-danger"
          />
          <span className="mx-4 mt-1">Google Sign In</span>
        </button>
        <button
          className="btn btn-secondary mx-2 d-flex justify-content-center"
          onClick={handleGithubSignIn}>

          <FontAwesomeIcon icon={faGithub} size="2x" className="text-dark" />
          <span className="mx-4 mt-1">Github Sign In</span>
        </button>
        <button
          className="btn btn-dark mx-2 d-flex justify-content-center"
          onClick={handleFacebookSignIn}>
          
          <FontAwesomeIcon
            icon={faFacebook}
            size="2x"
            className="text-primary"
          />
          <span className="mx-3 mt-1">Facebook Sign In</span>
        </button>
        <br />
      </div>

      <div>
        <div>
          <h2>{user.name}</h2>
          <p> {user.email}</p>
          <img src={user.photo} alt="" srcset="" />
        </div>
        <div>
          <Form onSubmit={handleRegistration}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onBlur={handleEmail} />
              <Form.Text className="text-muted" >
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onBlur={handlePassword} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
