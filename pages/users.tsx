import User from "@components/user";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type User = {
  id: number;
  name: string;
  email: string;
};

const UserList = ({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>List of Users</h1>
      {users.map((user: User) => {
        return (
          <div key={user.id}>
            <User user={user} />
          </div>
        );
      })}
    </>
  );
};

export default UserList;

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: User[] = await response.json();

  return {
    props: {
      users: data,
    },
  };
};
