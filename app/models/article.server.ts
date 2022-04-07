import { prisma } from "~/db.server";

export function getArticle({ id }: { id: string }) {
  return prisma.article.findFirst({
    where: { id },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}

export function getArticles() {
  return prisma.article.findMany({ orderBy: { title: "asc" } });
}

export function createArticle({ title }: { title: string }) {
  return prisma.article.create({
    data: {
      title,
    },
  });
}

export function deleteArticle({ id }: { id: string }) {
  return prisma.article.deleteMany({
    where: { id },
  });
}

export type { Article } from "@prisma/client";
