import { prisma } from "~/db.server";

export function getOption({ id }: { id: string }) {
  return prisma.option.findFirst({
    where: { id },
  });
}

export function getOptions() {
  return prisma.$queryRaw`SELECT * FROM Option ORDER BY "title" COLLATE NOCASE ASC`;
  // return prisma.option.findMany({ orderBy: { title: "asc" } });
}

export function createOption({
  title,
  categoryId,
}: {
  title: string;
  categoryId: string;
}) {
  return prisma.option.create({
    data: {
      title,
      categoryId,
    },
  });
}

export function deleteOption({ id }: { id: string }) {
  return prisma.option.deleteMany({
    where: { id },
  });
}

export type { Option } from "@prisma/client";
