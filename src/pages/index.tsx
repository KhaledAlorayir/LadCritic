import { type NextPage } from "next";
import Link from "next/link";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.review.userReviews.useQuery({
    userId: "clbx8p9mj0000v6bs0fara5tf",
    page: 1,
  });
  return (
    <div className="hero flex-1">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Lad Critic</h1>
          <p className="py-6">Review video games and share your opinions!</p>
          <Link href="/create" className="btn-primary btn">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
