import { prisma } from "~/db.server";

export function getCategory({ id }: { id: string }) {
  return prisma.category.findFirst({
    where: { id },
    include: {
      options: true,
    },
  });
}

export function getCategories() {
  return prisma.$queryRaw`SELECT * FROM Category ORDER BY "title" COLLATE NOCASE ASC`;
  // return prisma.category.findMany({ orderBy: { title: "asc" } });
}

export function createCategory({ title }: { title: string }) {
  return prisma.category.create({
    data: {
      title,
    },
  });
}

export function deleteCategory({ id }: { id: string }) {
  return prisma.category.deleteMany({
    where: { id },
  });
}

export type { Category } from "@prisma/client";
