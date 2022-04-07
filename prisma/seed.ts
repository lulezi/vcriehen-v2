import { PrismaClient } from "@prisma/client";
import bcrypt from "@node-rs/bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("rachelrox", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const articles = [
    {
      id: "trikot-kurz",
      title: "Trikot kurz",
    },
    {
      id: "trikot-lang",
      title: "Trikot lang",
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: article,
      create: article,
    });
  }

  const categories = [
    {
      id: "groesse",
      title: "Grösse",
    },
    {
      id: "geschlecht",
      title: "Geschlecht",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });
  }

  const articleCategoryRelations = [
    {
      articleId: articles[0].id,
      categoryId: categories[0].id,
    },
    {
      articleId: articles[0].id,
      categoryId: categories[1].id,
    },
    {
      articleId: articles[1].id,
      categoryId: categories[0].id,
    },
  ];

  for (const articleCategoryRelation of articleCategoryRelations) {
    await prisma.articleCategoryRelation.upsert({
      where: {
        articleId_categoryId: articleCategoryRelation,
      },
      update: articleCategoryRelation,
      create: articleCategoryRelation,
    });
  }

  const options = [
    {
      id: "S",
      title: "S",
      categoryId: "groesse",
    },
    {
      id: "M",
      title: "M",
      categoryId: "groesse",
    },
    {
      id: "L",
      title: "L",
      categoryId: "groesse",
    },
    {
      id: "XL",
      title: "XL",
      categoryId: "groesse",
    },
  ];

  for (const option of options) {
    await prisma.option.upsert({
      where: { id: option.id },
      update: option,
      create: option,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
