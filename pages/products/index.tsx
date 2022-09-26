import { GetStaticProps, InferGetStaticPropsType } from "next";

type ProductModel = {
  id: number;
  title: string;
  price: number;
  description: string;
};

const ProductList = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>List of Products</h1>
      {products.map((product: ProductModel) => {
        return (
          <div key={product.id} className="border-b border-b-gray-700">
            <h2>
              {product.id} {product.title} {product.price}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch("http://localhost:4000/products");
  const data = await response.json();

  return {
    props: {
      products: data,
    },
    revalidate: 10,
  };
};

export default ProductList;
