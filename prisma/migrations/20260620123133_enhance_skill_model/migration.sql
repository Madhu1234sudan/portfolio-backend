-- AlterTable
ALTER TABLE "Skill"
ADD     "Order" INTEGER NOT NULL DEFAULT 1;
ALTER TABLE "Skill"
ADD     "featured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Skill"
ADD     "icon" TEXT;
ALTER TABLE "Skill"
ADD     "level" INTEGER DEFAULT 80;
