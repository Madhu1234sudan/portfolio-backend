import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service";
const profileService = new ProfileService();
export const getProfile = async (
  req: Request,
  res: Response
) => {
  try {
  const profile =
    await profileService.getProfile();

  if (!profile) {
    return res.status(404).json({
      message: "Profile not found.",
    });
  }

  return res.status(200).json(profile);

} catch (error) {
  console.error(error);

  return res.status(500).json({
    message: "Failed to fetch profile",
  });
}
};

export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const {
  fullName,
  headline,
  shortBio,
  aboutMe,
  profileImage,
  resumeUrl,
  email,
  location,
  githubUrl,
  linkedinUrl,
  kaggleUrl,
  twitterUrl,
} = req.body;
if (!fullName?.trim()) {
  return res.status(400).json({
    message: "Full name is required.",
  });
}

if (!headline?.trim()) {
  return res.status(400).json({
    message: "Headline is required.",
  });
}

if (!shortBio?.trim()) {
  return res.status(400).json({
    message: "Short bio is required.",
  });
}

if (!aboutMe?.trim()) {
  return res.status(400).json({
    message: "About Me is required.",
  });
}
    const existingProfile =
  await profileService.getExistingProfile();

    if (!existingProfile) {

  const profile =
    await profileService.createProfile({
      fullName,
      headline,
      shortBio,
      aboutMe,
      profileImage,
      resumeUrl,
      email,
      location,
      githubUrl,
      linkedinUrl,
      kaggleUrl,
      twitterUrl,
    });

  return res
    .status(201)
    .json(profile);
}

      
    

    const updatedProfile =
  await profileService.updateProfile(
    existingProfile.id,
    {
      fullName,
      headline,
      shortBio,
      aboutMe,
      profileImage,
      resumeUrl,
      email,
      location,
      githubUrl,
      linkedinUrl,
      kaggleUrl,
      twitterUrl,
    }
  );

return res.status(200).json(
  updatedProfile
);

} catch (error) {
  console.error(error);

  return res.status(500).json({
    message: "Failed to update profile",
  });
}
};