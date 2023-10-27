import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";

import { PageLayout } from "~/components/layouts/page-layout";

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    return (
      <PageLayout>
        <div className="text-sm breadcrumbs mb-4">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <strong>Profile</strong>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 items-center">
          <div className="avatar">
            <div className="w-24 mask mask-squircle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={session?.user?.picture} alt={session?.user.name ?? ""} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl">
              Hello <strong>{session?.user.name}</strong>
            </span>
            <span className="flex items-center gap-2">
              <span>Verified user:</span>
              <input
                type="checkbox"
                checked={session?.user.email_verified}
                className="checkbox checkbox-secondary"
              />
            </span>
          </div>
        </div>
      </PageLayout>
    );
  },
  // returnTo must be included in the allowed callback URLs defined on Auth0
  { returnTo: "/profile" }
);
