import { ArticleCategoryRelation, Category } from "@prisma/client";
import type { LoaderFunction, ActionFunction } from "remix";
import { redirect, json, useLoaderData, useCatch, Form } from "remix";
import invariant from "tiny-invariant";
import { DangerButton } from "~/components/DangerButton";
import type { Article } from "~/models/article.server";
import { getArticle, deleteArticle } from "~/models/article.server";

type LoaderData = {
  article: Article & {
    categories: (ArticleCategoryRelation & {
      category: Category;
    })[];
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  invariant(id, "id not found");

  const article = await getArticle({ id });
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ article });
};

export const action: ActionFunction = async ({ request, params }) => {
  const id = params.id;

  invariant(id, "id not found");

  switch (request.method) {
    case "POST": {
      break;
    }
    case "PUT": {
      break;
    }
    case "PATCH": {
      break;
    }
    case "DELETE": {
      await deleteArticle({ id });
      return redirect("/articles");
    }
  }

  return redirect(`/articles/${id}`);
};

export default function ArticleDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.article.title}</h3>

      {data.article.categories.map((rel) => (
        <div key={rel.categoryId}>{rel.category.title}</div>
      ))}

      <hr className="my-4" />

      <Form method="delete">
        <DangerButton>Delete</DangerButton>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Article not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
