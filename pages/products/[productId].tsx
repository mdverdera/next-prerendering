import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

const Product = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="border-b border-b-gray-700">
        <h2>
          {product.id} {product.title} {product.price}
        </h2>

        <p>{product.description}</p>
      </div>
    </>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const arr: string[] = ["1"];
  const paths = arr.map((productId) => {
    return {
      params: { productId },
    };
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `http://localhost:4000/products/${params?.productId}`
  );

  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data,
    },
  };
};
