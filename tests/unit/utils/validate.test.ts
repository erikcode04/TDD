import { describe, test, expect } from "vitest";
import {
    validateBlogPostFormData,
    validateEmailAddressStructure,
} from "../../../src/frontend/utils/validate";
import { blogPostFormSubmitType } from "../../../src/constants";
import type { BlogPostFormData } from "../../../src/types/bitkrets";

/**
 * TDD APPROACH - Vi skriver testerna FÖRST
 * Dessa tester beskriver vad funktionen SKA göra
 * Många kommer att misslyckas initialt (RED)
 * Sedan implementerar vi koden för att göra dem gröna (GREEN)
 */

describe("validateBlogPostFormData", () => {
    describe("Valid scenarios - should return true", () => {
        test("should accept valid blog post data", () => {
            const validData: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Valid Title",
                blogText: "This is valid blog text content.",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(validData)).toBe(true);
        });

        test("should accept blog post with minimum valid length", () => {
            const minData: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Hi", // 2 chars
                blogText: "OK", // 2 chars
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(minData)).toBe(true);
        });

        test("should accept blog post with special characters", () => {
            const specialData: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Title with åäö & special!",
                blogText: "Text with émojis 🎉 and symbols @#$",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(specialData)).toBe(true);
        });

        test("should accept long blog posts", () => {
            const longData: BlogPostFormData = {
                blogId: "123",
                blogTitle: "A".repeat(200),
                blogText: "B".repeat(5000),
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(longData)).toBe(true);
        });
    });

    describe("Invalid scenarios - should return false", () => {
        test("should reject empty blog title", () => {
            const emptyTitle: BlogPostFormData = {
                blogId: "123",
                blogTitle: "",
                blogText: "Valid text",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(emptyTitle)).toBe(false);
        });

        test("should reject empty blog text", () => {
            const emptyText: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Valid title",
                blogText: "",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(emptyText)).toBe(false);
        });

        test("should reject blog title with only whitespace", () => {
            const whitespaceTitle: BlogPostFormData = {
                blogId: "123",
                blogTitle: "   ",
                blogText: "Valid text",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(whitespaceTitle)).toBe(false);
        });

        test("should reject blog text with only whitespace", () => {
            const whitespaceText: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Valid title",
                blogText: "   \n\t  ",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(whitespaceText)).toBe(false);
        });

        test("should reject when blog title is too short (less than 2 chars)", () => {
            const tooShort: BlogPostFormData = {
                blogId: "123",
                blogTitle: "A",
                blogText: "Valid text",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(tooShort)).toBe(false);
        });

        test("should reject when blog text is too short (less than 2 chars)", () => {
            const tooShort: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Valid title",
                blogText: "X",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(tooShort)).toBe(false);
        });

        test("should reject when blog title is too long (more than 200 chars)", () => {
            const tooLong: BlogPostFormData = {
                blogId: "123",
                blogTitle: "A".repeat(201),
                blogText: "Valid text",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(tooLong)).toBe(false);
        });

        test("should reject when blog text is too long (more than 10000 chars)", () => {
            const tooLong: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Valid title",
                blogText: "B".repeat(10001),
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(tooLong)).toBe(false);
        });

        test("should reject when blogTitle is not a string", () => {
            const invalidType: any = {
                blogId: "123",
                blogTitle: 12345,
                blogText: "Valid text",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(invalidType)).toBe(false);
        });

        test("should reject when blogText is not a string", () => {
            const invalidType: any = {
                blogId: "123",
                blogTitle: "Valid title",
                blogText: null,
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(invalidType)).toBe(false);
        });

        test("should reject when formData is undefined", () => {
            expect(validateBlogPostFormData(undefined as any)).toBe(false);
        });

        test("should reject when formData is null", () => {
            expect(validateBlogPostFormData(null as any)).toBe(false);
        });
    });

    describe("Trimming and whitespace handling", () => {
        test("should accept title with leading/trailing whitespace (after trim)", () => {
            const paddedTitle: BlogPostFormData = {
                blogId: "123",
                blogTitle: "  Valid Title  ",
                blogText: "Valid text",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(paddedTitle)).toBe(true);
        });

        test("should accept text with leading/trailing whitespace (after trim)", () => {
            const paddedText: BlogPostFormData = {
                blogId: "123",
                blogTitle: "Valid title",
                blogText: "  Valid text content  ",
                submitType: blogPostFormSubmitType.create,
            };
            expect(validateBlogPostFormData(paddedText)).toBe(true);
        });
    });
});

describe("validateEmailAddressStructure", () => {
    describe("Valid email formats - should return true", () => {
        test("should accept standard email", () => {
            expect(validateEmailAddressStructure("user@example.com")).toBe(true);
        });

        test("should accept email with dots in local part", () => {
            expect(validateEmailAddressStructure("first.last@example.com")).toBe(
                true
            );
        });

        test("should accept email with plus sign", () => {
            expect(validateEmailAddressStructure("user+tag@example.com")).toBe(true);
        });

        test("should accept email with numbers", () => {
            expect(validateEmailAddressStructure("user123@example456.com")).toBe(
                true
            );
        });

        test("should accept email with subdomain", () => {
            expect(validateEmailAddressStructure("user@mail.example.com")).toBe(
                true
            );
        });

        test("should accept email with hyphen in domain", () => {
            expect(validateEmailAddressStructure("user@my-domain.com")).toBe(true);
        });
    });

    describe("Invalid email formats - should return false", () => {
        test("should reject email without @", () => {
            expect(validateEmailAddressStructure("userexample.com")).toBe(false);
        });

        test("should reject email without domain", () => {
            expect(validateEmailAddressStructure("user@")).toBe(false);
        });

        test("should reject email without local part", () => {
            expect(validateEmailAddressStructure("@example.com")).toBe(false);
        });

        test("should reject email without TLD", () => {
            expect(validateEmailAddressStructure("user@example")).toBe(false);
        });

        test("should reject email with spaces", () => {
            expect(validateEmailAddressStructure("user name@example.com")).toBe(
                false
            );
        });

        test("should reject email with double @", () => {
            expect(validateEmailAddressStructure("user@@example.com")).toBe(false);
        });

        test("should reject empty string", () => {
            expect(validateEmailAddressStructure("")).toBe(false);
        });

        test("should reject only whitespace", () => {
            expect(validateEmailAddressStructure("   ")).toBe(false);
        });

        test("should reject when email is undefined", () => {
            expect(validateEmailAddressStructure(undefined as any)).toBe(false);
        });

        test("should reject when email is null", () => {
            expect(validateEmailAddressStructure(null as any)).toBe(false);
        });

        test("should reject email with invalid characters", () => {
            expect(validateEmailAddressStructure("user#name@example.com")).toBe(
                false
            );
        });
    });
});
