import type { BlogPostFormData } from "../../types/bitkrets";

export function validateBlogPostFormData(formData: BlogPostFormData) {
  // Guard: Check if formData exists
  if (!formData || typeof formData !== "object") {
    return false;
  }

  const blogTitle = formData.blogTitle;
  const blogText = formData.blogText;

  // Guard: Check if both fields are strings
  if (typeof blogTitle !== "string" || typeof blogText !== "string") {
    return false;
  }

  // Trim whitespace and check length
  const trimmedTitle = blogTitle.trim();
  const trimmedText = blogText.trim();

  // Check minimum length (at least 2 characters)
  if (trimmedTitle.length < 2 || trimmedText.length < 2) {
    return false;
  }

  // Check maximum length (title: 200, text: 10000)
  if (trimmedTitle.length > 200 || trimmedText.length > 10000) {
    return false;
  }

  return true;
}

export function validateEmailAddressStructure(emailAddress: string) {
  // validate email address structure
  const validEmailStructure =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmailStructure.test(emailAddress);
}
