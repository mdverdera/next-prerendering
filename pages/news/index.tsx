import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type ArticleModel = {
  id: number;
  title: string;
  description: string;
  category: string;
};

const NewsArticleList = ({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1 className="text-6xl">List of News Articles</h1>

      {articles.map((article: ArticleModel) => {
        return (
          <div key={article.id}>
            <h2>
              {article.id} {article.title} | {article.category}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default NewsArticleList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch("http://localhost:4000/news");

  const data = await response.json();
  return {
    props: {
      articles: data,
    },
  };
};
