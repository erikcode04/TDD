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

  if (trimmedTitle.length > 0 && trimmedText.length > 0) {
    return true;
  }

  return false;
}

export function validateEmailAddressStructure(emailAddress: string) {
  // validate email address structure
  const validEmailStructure =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return validEmailStructure.test(emailAddress);
}
