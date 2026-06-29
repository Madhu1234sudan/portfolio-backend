-- CreateTable
CREATE TABLE "Research" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "researchImage" TEXT,
    "pdfUrl" TEXT,
    "githubUrl" TEXT,
    "publicationUrl" TEXT,
    "tags" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);
