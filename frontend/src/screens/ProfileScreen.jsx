import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import axios from "axios";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image,setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, {isLoading}] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setImage(userInfo.image);
  }, [userInfo.email, userInfo.name, userInfo.phone, userInfo.image]);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("image",image);
        const result = await axios.put(
            "http://localhost:3000/api/users/profile",
            formData,
            {
                headers:{ "Content-Type": "multipart/form-data" }
            }
        )
        const res = await updateProfile({
            _id:userInfo._id,
            name,
            email,
            phone,
            password,
            image,
        }).unwrap()
        dispatch(setCredentials({...res}))
        toast.success("Profile Updated")
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  };

  return (
    <FormContainer>
      <h2>Update Profile</h2>
      {userInfo.image ? (
        <>
        <img style={{width:"150px", height:"150px"}} src={require(`../profileImages/${userInfo.image}`)} alt="ProfileImage"/>
        </>
      ) : (
        <>
        <p className="text-danger">No Profile Picture</p>
        </>
      ) }
      <br />
      <Form onSubmit={submitHandler}>
      <div>
        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Change Profile Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageUpload}
          />
        </Form.Group>
        {/* {image && <img style={{width:"150px", height:"150px"}} src={URL.createObjectURL(image)} alt="Preview" />} */}
      </div>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
