import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const tagsArray = data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      const response = await fetch("http://localhost:7000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tags: tagsArray,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        throw new Error(`Failed: ${errorData.message || "Unknown error"}`);
      }

      const result = await response.json();
      console.log("success:", result);
      reset();
      alert("Form submitted successfuly");
    } catch (error) {
      console.error("Error:", error);
      alert("an error occured while submitting the form.");
    }
  };
  console.log(errors);

  return (
    <main className="mx-auto max-w-md p-6 bg-gray-700 shadow-md rounded-lg">
      <div className="flex justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Create a New Post
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "Title is Required..",
              min: 0,
              maxLength: 150,
            })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add Content.."
            {...register("content", {
              required: "Content is Required",
            })}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-400">
              {errors.content.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Tags"
            {...register("tags", {
              required: "Tags Required",
            })}
          />

          {errors.tags && (
            <p className="mt-1 text-sm text-red-400">{errors.tags.message}</p>
          )}
        </div>
        <input
          type="submit"
          className="w-full rounded px-4 py-2 hover:bg-blue-700 bg-blue-600"
        />
      </form>
    </main>
  );
};

export default Form;