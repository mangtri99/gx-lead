import HeadWrapper from "../../components/General/HeadWrapper";
import NotFound from "../../components/General/NotFound";

export default function Index() {
  const title = "404 Not Found";
  const description = "The page you are looking for does not exist";
  return (
    <HeadWrapper title={title} description={description}>
      <div className="h-screen w-100 flex flex-column align-items-center">
        <NotFound
          title="404 Not Found"
          description="The page you are looking for does not exist"
        />
      </div>
    </HeadWrapper>
  );
}
