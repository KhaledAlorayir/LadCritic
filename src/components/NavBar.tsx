import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {};

const NavBar = (props: Props) => {
  const { data, status } = useSession();

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          LadCritic
        </Link>
      </div>
      {status === "authenticated" ? (
        <div className="flex-none">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn m-2">
              <div className="w-14 rounded-full">
                {data.user?.image && <img src={data.user.image} />}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li className="hover:bg-primary">
                <a>Profile</a>
              </li>

              <li className="hover:bg-primary">
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : status === "unauthenticated" ? (
        <button
          className="btn-outline btn-primary btn m-2"
          onClick={() => signIn()}
        >
          Login!
        </button>
      ) : (
        <progress className="progress m-2 w-20"></progress>
      )}
    </div>
  );
};

export default NavBar;
