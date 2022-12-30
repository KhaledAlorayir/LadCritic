import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
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
