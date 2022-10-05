import useSWR from "swr";

type DashboardDataModel = {
  posts: number;
  likes: number;
  followers: number;
  following: number;
};

const fetcher = async () => {
  const response = await fetch("http://localhost:4000/dashboard");
  const data: DashboardDataModel = await response.json();
  return data;
};

const DashboardSWR = () => {
  const { data, error } = useSWR("dashboard", fetcher);

  if (error) return "An error has occured.";
  if (!data) return "Loading";
  return (
    <>
      <h2>Dashboard</h2>
      <h2>Posts - {data.posts}</h2>
      <h2>Likes - {data.likes}</h2>
      <h2>Followers - {data.followers}</h2>
      <h2>Following - {data.following}</h2>
    </>
  );
};

export default DashboardSWR;
