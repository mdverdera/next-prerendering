import { InferGetStaticPropsType } from "next";
import { getStaticProps } from "@pages/users";

const User = ({ user }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </>
  );
};

export default User;
