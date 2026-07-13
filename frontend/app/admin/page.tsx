"use client";

import { FormEvent, useState } from "react";

type FormData = {
  agency: string;
  title: string;
  category: string;
  date: string;
  source_url: string;
  summary: string;
};

const initialFormData: FormData = {
  agency: "",
  title: "",
  category: "Federal",
  date: "",
  source_url: "",
  summary: "",
};

export default function AdminPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof FormData, value: string) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const createdActivity = await response.json();

      setMessage(
        `Activity record ${createdActivity.id} was added successfully.`
      );

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      setMessage(
        "The activity could not be added. Make sure the backend server is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-8 py-20 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-widest text-zinc-400">
          Administration
        </p>

        <h1 className="text-5xl font-bold">Add an activity record</h1>

        <p className="mt-4 text-lg text-zinc-300">
          Submit a new policy, regulatory, utility, regional, or project update
          to the Energy Policy Tracker database.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 rounded-lg border border-zinc-800 p-8"
        >
          <div>
            <label htmlFor="agency" className="mb-2 block font-semibold">
              Agency or organization
            </label>

            <input
              id="agency"
              type="text"
              required
              value={formData.agency}
              onChange={(event) =>
                updateField("agency", event.target.value)
              }
              placeholder="DOE, FERC, NRC, CPUC, PG&E..."
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label htmlFor="title" className="mb-2 block font-semibold">
              Title
            </label>

            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(event) =>
                updateField("title", event.target.value)
              }
              placeholder="Enter the activity title"
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label htmlFor="category" className="mb-2 block font-semibold">
              Category
            </label>

            <select
              id="category"
              value={formData.category}
              onChange={(event) =>
                updateField("category", event.target.value)
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            >
              <option value="Federal">Federal</option>
              <option value="State">State</option>
              <option value="Regional">Regional</option>
              <option value="Utility">Utility</option>
              <option value="Project">Project</option>
              <option value="County">County</option>
              <option value="City">City</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="mb-2 block font-semibold">
              Date
            </label>

            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(event) =>
                updateField("date", event.target.value)
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label htmlFor="source_url" className="mb-2 block font-semibold">
              Source URL
            </label>

            <input
              id="source_url"
              type="url"
              value={formData.source_url}
              onChange={(event) =>
                updateField("source_url", event.target.value)
              }
              placeholder="https://..."
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label htmlFor="summary" className="mb-2 block font-semibold">
              Summary
            </label>

            <textarea
              id="summary"
              rows={5}
              value={formData.summary}
              onChange={(event) =>
                updateField("summary", event.target.value)
              }
              placeholder="Describe the decision or announcement."
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Adding activity..." : "Add activity"}
          </button>

          {message && (
            <p className="rounded-md border border-zinc-700 p-4 text-zinc-200">
              {message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}