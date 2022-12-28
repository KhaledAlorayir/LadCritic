import { GetServerSideProps } from "next";
import { z } from "zod";
import { prisma } from "server/db/client";
import { trpc } from "utils/trpc";
import { useState } from "react";
import ReviewList from "components/shared/ReviewList";

type Props = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const validated = z.object({ uid: z.string().cuid() }).safeParse(query);

  if (!validated.success) {
    return {
      notFound: true,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: validated.data.uid,
    },
    select: {
      name: true,
      image: true,
      id: true,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }
  return { props: { user } };
};

const User = ({ user }: Props) => {
  /*
    TODO:
     1- pagination
     2- connect to user profile & review page
     3- invalidate after insert
  */

  const [page, setPage] = useState(0);
  const { data, isLoading, isSuccess } = trpc.review.userReviews.useQuery({
    page,
    userId: user.id,
  });

  return (
    <div className="py-8">
      <div className="text-center">
        {user.image && (
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <img src={user.image} alt={user.name || "username"} />
            </div>
          </div>
        )}
        <p className="font-mono font-semibold tracking-wide">{user.name}</p>
      </div>
      <ReviewList data={data} isLoading={isLoading} isSuccess={isSuccess} />
    </div>
  );
};

export default User;
