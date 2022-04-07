import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/pro-duotone-svg-icons";
import { json, useLoaderData, Outlet, Link, NavLink } from "remix";
import type { LoaderFunction } from "remix";
import { getArticles } from "~/models/article.server";

type LoaderData = {
  articleListItems: Awaited<ReturnType<typeof getArticles>>;
};

export const loader: LoaderFunction = async () => {
  const articleListItems = await getArticles();
  return json<LoaderData>({ articleListItems });
};

export default function ArticlesPage() {
  const data = useLoaderData() as LoaderData;
  // const user = useUser();

  return (
    <div className="flex w-full h-full min-h-screen flex-col">
      {/* <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Articles</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header> */}
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50 overflow-y-auto">
          <Link to="new" className="block p-3 text-blue-500">
            <FontAwesomeIcon icon={faAdd} /> Neuer Artikel
          </Link>

          <hr />

          {data.articleListItems.length === 0 ? (
            <p className="p-4">No articles yet</p>
          ) : (
            <ol>
              {data.articleListItems.map((article) => (
                <li key={article.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-3 ${isActive ? "bg-white" : ""}`
                    }
                    to={article.id}
                  >
                    {article.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
