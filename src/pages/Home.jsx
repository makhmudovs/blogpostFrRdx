import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      {user?.username ? (
        <div>
          <h1>Welcome {user.username}</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome guest</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
