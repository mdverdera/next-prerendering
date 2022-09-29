import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type ArticleModel = {
  id: number;
  title: string;
  description: string;
  category: string;
};

const ArticleListByCategory = ({
  articles,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1>
        Showing news for Category <i>{category}</i>
      </h1>

      {articles.map((article: ArticleModel) => {
        return (
          <div key={article.id} className="border-b border-b-gray-700">
            <h2>
              {article.id} {article.title}
            </h2>
            <p>{article.description}</p>
          </div>
        );
      })}
    </>
  );
};

export default ArticleListByCategory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const response = await fetch(
    `http://localhost:4000/news?category=${params?.category}`
  );

  const data = await response.json();

  return {
    props: {
      articles: data,
      category: params?.category,
    },
  };
};
