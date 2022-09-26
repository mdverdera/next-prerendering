import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

export type PostModel = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const PostList = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>List of Posts</h1>

      {posts.map((post: PostModel) => {
        return (
          <div key={post.id}>
            <Link href={`posts/${post.id}`} passHref>
              <h2>
                {post.id} {post.title}
              </h2>
            </Link>
            <div className="border-b-2 border-b-gray-500"></div>
          </div>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return {
    props: {
      // posts: data.slice(0, 3),
      posts: data,
    },
  };
};

export default PostList;
