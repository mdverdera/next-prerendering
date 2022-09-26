import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { PostModel } from ".";

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  const paths = data.map((post: PostModel) => {
    return {
      params: { postId: `${post.id}` },
    };
  });

  // const arr: string[] = ["1", "2", "3"];
  // const paths = arr.map((postId) => {
  //   return {
  //     params: { postId },
  //   };
  // });

  return { paths, fallback: "blocking" };
  //fallback false: returns 404 page
  //fallback true: generate the fallback page
  //fallback blocking: will render the page on the server
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.postId}`
  );

  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data,
    },
  };
};
