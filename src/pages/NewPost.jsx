import { useState } from "react";

function Post() {
  const [postType, setPostType] = useState("question");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    abstract: "",
    articleText: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Please enter a title.";}
 
    // Validate question description
    if (
      postType === "question" &&
      !formData.description.trim()
    ) {
      newErrors.description =
        "Please describe your problem.";
    }

    // Validate article abstract
    if (
      postType === "article" &&
      !formData.abstract.trim()
    ) {
      newErrors.abstract = "Please enter an abstract.";
    }

    // Validate article text
    if (
      postType === "article" &&
      !formData.articleText.trim()
    ) {
      newErrors.articleText =
        "Please enter your article text.";
    }

    // Validate maximum of three tags
    const tagList = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (tagList.length > 3) {
      newErrors.tags =
        "You can enter a maximum of 3 tags.";
    }

    setErrors(newErrors);

    // Stop if validation errors exist
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Show success message
    alert(
      `Your ${
        postType === "question" ? "question" : "article"
      } has been submitted successfully!`
    );
  };

  const handlePostTypeChange = (type) => {
    setPostType(type);
    setErrors({});
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8">
      <h1 className="mb-6 bg-gray-200 p-4 text-2xl font-bold">
        New Post
      </h1>

      {/* Select post type */}
      <div className="mb-6">
        <p className="mb-4 font-semibold">
          Select Post Type:
        </p>

        <div className="flex items-center gap-8">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="postType"
              value="question"
              checked={postType === "question"}
              onChange={() =>
                handlePostTypeChange("question")
              }
            />
            Question
          </label>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="postType"
              value="article"
              checked={postType === "article"}
              onChange={() =>
                handlePostTypeChange("article")
              }
            />
            Article
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <h2 className="mb-6 bg-gray-200 p-4 font-semibold">
          What do you want to ask or share
        </h2>

        {/* Title field */}
        <label
          htmlFor="title"
          className="mb-2 block font-medium"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder={
            postType === "question"
              ? "Start your question with how, what, why, etc."
              : "Enter a descriptive title"
          }
          aria-invalid={Boolean(errors.title)}
          aria-describedby={
            errors.title ? "title-error" : undefined
          }
          className={`w-full rounded-md border px-4 py-3 outline-none ${
            errors.title
              ? "border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />

        {errors.title && (
          <p
            id="title-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.title}
          </p>
        )}

        {/* Question fields */}
        {postType === "question" && (
          <>
            <label
              htmlFor="description"
              className="mb-2 mt-6 block font-medium"
            >
              Describe your problem
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your question or problem..."
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description
                  ? "description-error"
                  : undefined
              }
              className={`w-full rounded-md border px-4 py-3 ${
                errors.description
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              rows={5}
            />

            {errors.description && (
              <p
                id="description-error"
                role="alert"
                className="mt-2 text-sm text-red-600"
              >
                {errors.description}
              </p>
            )}
          </>
        )}

        {/* Article fields */}
        {postType === "article" && (
          <>
            <label
              htmlFor="abstract"
              className="mb-2 mt-6 block font-medium"
            >
              Abstract
            </label>

            <textarea
              id="abstract"
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              placeholder="Enter a short abstract..."
              aria-invalid={Boolean(errors.abstract)}
              aria-describedby={
                errors.abstract
                  ? "abstract-error"
                  : undefined
              }
              className={`w-full rounded-md border px-4 py-3 ${
                errors.abstract
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              rows={3}
            />

            {errors.abstract && (
              <p
                id="abstract-error"
                role="alert"
                className="mt-2 text-sm text-red-600"
              >
                {errors.abstract}
              </p>
            )}

            <label
              htmlFor="articleText"
              className="mb-2 mt-6 block font-medium"
            >
              Article Text
            </label>

            <textarea
              id="articleText"
              name="articleText"
              value={formData.articleText}
              onChange={handleChange}
              placeholder="Write your article..."
              aria-invalid={Boolean(errors.articleText)}
              aria-describedby={
                errors.articleText
                  ? "articleText-error"
                  : undefined
              }
              className={`w-full rounded-md border px-4 py-3 ${
                errors.articleText
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              rows={7}
            />

            {errors.articleText && (
              <p
                id="articleText-error"
                role="alert"
                className="mt-2 text-sm text-red-600"
              >
                {errors.articleText}
              </p>
            )}
          </>
        )}

        {/* Tags field */}
        <label
          htmlFor="tags"
          className="mb-2 mt-6 block font-medium"
        >
          Tags (maximum 3)
        </label>

        <input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          placeholder="React, JavaScript, Web Development"
          aria-invalid={Boolean(errors.tags)}
          aria-describedby={
            errors.tags ? "tags-error" : undefined
          }
          className={`w-full rounded-md border px-4 py-3 ${
            errors.tags
              ? "border-red-400"
              : "border-gray-300"
          }`}
        />

        {errors.tags && (
          <p
            id="tags-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {errors.tags}
          </p>
        )}


      {/* Keyword field 
      <label
        htmlFor="keyword"
        className="mb-2 mt-6 block font-medium"
      >
        Keywords
      </label>

      <input
        id="keyword"
        name="keyword"
        type="text"
        value={formData.keyword}
        onChange={handleChange}
        placeholder="React, JavaScript, Web Development"
        aria-invalid={Boolean(errors.keyword)}
        aria-describedby={
          errors.keyword ? "keyword-error" : undefined
        }
        className={`w-full rounded-md border px-4 py-3 ${
          errors.keyword
            ? "border-red-400"
            : "border-gray-300"
        }`}
      />

      {errors.keyword && (
        <p
          id="keyword-error"
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {errors.keyword}
        </p>
)}*/}

        {/* Post button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;