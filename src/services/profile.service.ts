import prisma from "../config/prisma";

export class ProfileService {
    async getProfile() {
  return await prisma.profile.findFirst();
}
async createProfile(data: {
  fullName: string;
  headline: string;
  shortBio: string;
  aboutMe: string;
  profileImage?: string;
  resumeUrl?: string;
  email?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  kaggleUrl?: string;
  twitterUrl?: string;
}) {
  return await prisma.profile.create({
    data,
  });
}
async updateProfile(
  id: number,
  data: {
    fullName: string;
    headline: string;
    shortBio: string;
    aboutMe: string;
    profileImage?: string;
    resumeUrl?: string;
    email?: string;
    location?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    kaggleUrl?: string;
    twitterUrl?: string;
  }
) {
  return await prisma.profile.update({
    where: {
      id,
    },
    data,
  });
}
async getExistingProfile() {
  return await prisma.profile.findFirst();
}
}