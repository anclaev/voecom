-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('Private', 'Corporal', 'LanceSergeant', 'Sergeant', 'StaffSergeant', 'SergeantMajor', 'WarrantOfficer', 'SeniorWarrantOfficer', 'Lieutenant', 'SeniorLieutenant', 'Captain', 'Major', 'LieutenantColonel', 'Colonel');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Supervisor', 'Administrator');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "salary" INTEGER,
    "personal_key" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rank" "Rank" NOT NULL DEFAULT 'Private',
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration" TIMESTAMP(3) NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "browser" TEXT,
    "device" TEXT,
    "os" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DutyMember" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "employee_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,
    "duty_id" TEXT,

    CONSTRAINT "DutyMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewOwner" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "ReviewOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "theme_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "duty_id" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingOwner" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "TrainingOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duty" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmployeeToPosition" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DutyMemberToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_login_key" ON "Employee"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Post_name_key" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewOwner_reviewId_key" ON "ReviewOwner"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToPosition_AB_unique" ON "_EmployeeToPosition"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToPosition_B_index" ON "_EmployeeToPosition"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DutyMemberToTraining_AB_unique" ON "_DutyMemberToTraining"("A", "B");

-- CreateIndex
CREATE INDEX "_DutyMemberToTraining_B_index" ON "_DutyMemberToTraining"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyMember" ADD CONSTRAINT "DutyMember_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyMember" ADD CONSTRAINT "DutyMember_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DutyMember" ADD CONSTRAINT "DutyMember_duty_id_fkey" FOREIGN KEY ("duty_id") REFERENCES "Duty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "DutyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewOwner" ADD CONSTRAINT "ReviewOwner_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "DutyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewOwner" ADD CONSTRAINT "ReviewOwner_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "TrainingOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_duty_id_fkey" FOREIGN KEY ("duty_id") REFERENCES "Duty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingOwner" ADD CONSTRAINT "TrainingOwner_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "DutyMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToPosition" ADD CONSTRAINT "_EmployeeToPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToPosition" ADD CONSTRAINT "_EmployeeToPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyMemberToTraining" ADD CONSTRAINT "_DutyMemberToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "DutyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DutyMemberToTraining" ADD CONSTRAINT "_DutyMemberToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
