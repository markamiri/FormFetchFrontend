"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdminPage() {
  const [toValue, setToValue] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const [generatedLink, setGeneratedLink] = useState("");

  const generateLink = () => {
    const encodedTo = encodeURIComponent(toValue.trim());
    const encodedDeadline = encodeURIComponent(deadline?.toISOString() || "");

    const url = `${window.location.origin}/disclosureForm?to=${encodedTo}&deadline=${encodedDeadline}`;
    setGeneratedLink(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-indigo-700 text-white px-6 py-4 rounded">
        <h1 className="text-2xl font-bold">Form Fetch</h1>
      </header>
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Disclosure Form Link Generator
        </h1>

        <label className="block mb-2 font-medium text-black">To:</label>
        <input
          type="text"
          value={toValue}
          onChange={(e) => setToValue(e.target.value)}
          className="border px-3 py-2 w-full rounded mb-4 text-black"
          placeholder="e.g. Metropolitan Toronto Condominium Corporation No. 1034, (the Corporation)"
        />

        <label className="block mb-2 font-medium text-black">Deadline:</label>
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex-1">
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Click to select date and time"
              className="border px-3 py-2 w-full rounded text-black"
              minDate={new Date()} // ⛔ Prevent past dates
            />
          </div>

          <button
            onClick={generateLink}
            className="bg-indigo-700 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Generate Link
          </button>
        </div>

        {generatedLink && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded p-4 shadow-sm">
            <p className="font-semibold text-gray-800 mb-2">Generated URL:</p>
            <div className="flex items-center justify-between gap-4">
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 font-medium break-all hover:underline"
              >
                {generatedLink}
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                }}
                className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700 transition"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
