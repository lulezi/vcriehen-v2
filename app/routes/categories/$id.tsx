import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripDots,
  faICursor,
  faTrashCan,
} from "@fortawesome/pro-duotone-svg-icons";
import { Option } from "@prisma/client";
import type { LoaderFunction, ActionFunction } from "remix";
import { redirect, json, useLoaderData, useCatch, Form } from "remix";
import invariant from "tiny-invariant";
import { DangerButton } from "~/components/DangerButton";
import type { Category } from "~/models/category.server";
import { getCategory, deleteCategory } from "~/models/category.server";
import { createOption } from "~/models/option.server";

type LoaderData = {
  category: Category & {
    options: Option[];
  };
};

type ActionData = {
  errors?: {
    title?: string;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  invariant(id, "id not found");

  const category = await getCategory({ id });
  if (!category) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ category });
};

export const action: ActionFunction = async ({ request, params }) => {
  const id = params.id;

  invariant(id, "id not found");

  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const title = formData.get("title");

      if (typeof title !== "string" || title.length === 0) {
        return json<ActionData>(
          { errors: { title: "Title is required" } },
          { status: 400 }
        );
      }

      await createOption({ title, categoryId: id });
      break;
    }

    case "PUT": {
      break;
    }

    case "PATCH": {
      break;
    }

    case "DELETE": {
      await deleteCategory({ id });
      return redirect("/categories");
    }
  }

  return redirect(`/categories/${id}`);
};

export default function CategoryDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h2 className="text-2xl font-bold">{data.category.title}</h2>

      <div className="table mt-3 border-collapse table-auto w-full text-sm">
        <div className="table-header-group bg-white">
          <div className="table-row">
            <div className="table-cell border-b w-20 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left"></div>
            <div className="table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
              Name
            </div>
            <div className="table-cell border-b w-40 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
              Actions
            </div>
          </div>
        </div>

        <div className="table-row-group bg-white ">
          {data.category.options.map((option) => (
            <div className="table-row" key={option.id}>
              <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500">
                <FontAwesomeIcon icon={faGripDots} />
              </div>
              <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500">
                {option.title}
              </div>
              <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500">
                <FontAwesomeIcon icon={faICursor} />
                <FontAwesomeIcon icon={faTrashCan} className="ml-3" />
              </div>
            </div>
          ))}
        </div>

        <div className="table-footer-group bg-white">
          <div className="table-row">
            <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500"></div>
            <div
              className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500"
              contentEditable="true"
            >
              {/* <Form method="post" className="mt-2">
                <div className="flex">
                  <input
                    className="rounded-sm mr-1 p-2 border-2 border-blue-500"
                    name="title"

                  />
                  <button className="rounded p-2 bg-blue-500 text-white">
                    Option hinzufügen
                  </button>
                </div>
              </Form> */}
            </div>
            <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500"></div>
          </div>
        </div>
      </div>

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
    return <div>Category not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
