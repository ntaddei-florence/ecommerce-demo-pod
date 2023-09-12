import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function Profile() {
    const session = await getSession();
    return (
      <div className="pt-8">
        Hello <strong>{session?.user.name}</strong>
      </div>
    );
  },
  // returnTo must be included in the allowed callback URLs defined on Auth0
  { returnTo: "/profile" }
);
