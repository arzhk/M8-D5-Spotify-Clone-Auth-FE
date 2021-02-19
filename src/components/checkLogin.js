import axios from "axios";

const checkLoginHandler = async () => {
  try {
    const res = await axios("http://localhost:3003/users/me", {
      withCredentials: true,
    });
    console.log(res);
    return;
  } catch (err) {
    console.log(err);
  }
};

export { checkLoginHandler };
