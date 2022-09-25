import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1>Next JS pre-rendering</h1>
      <Link href="/users">
        <a>Users</a>
      </Link>
    </>
  );
};

export default Home;
