// app/meeting/page.tsx

"use client";

{
  /* FIX In the video the url goes from question 0 -> proxy ->review -> confirm -> Done */
}

import React, { useState } from "react";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaUser,
  FaDownload,
  FaTimes,
} from "react-icons/fa";

export default function MeetingPage() {
  const [step, setStep] = useState(1);
  const [customNominee, setCustomNominee] = useState("");
  const [nominees, setNominees] = useState(["Inge Russell", "Maija Nappi"]);
  const [proxyHolder, setProxyHolder] = useState("");
  const [selectedRep, setSelectedRep] = useState("");
  const [fallbackEnabled, setFallbackEnabled] = useState(true);
  const [faqOpen, setFaqOpen] = useState("");
  //const [authorization, setAuthorization] = useState<number | null>(null);
  const [signature, setSignature] = useState("");

  const formData = {
    address: "MTCC 1034",
    suite: "Test",
    name: "Tim Bourdignon",
    email: "tim@ct-quality.com",
  };

  const handleNomineeAdd = () => {
    if (customNominee.trim() && nominees.length < 5) {
      setNominees([...nominees, customNominee.trim()]);
      setCustomNominee("");
    }
  };

  const removeNominee = (name: string) => {
    setNominees(nominees.filter((n) => n !== name));
  };

  const toggleFaq = (item: string) => {
    setFaqOpen(faqOpen === item ? "" : item);
  };

  const Stepper = () => (
    <div className="flex justify-center gap-8 mt-8 text-center text-black">
      {["Start", "Questions", "Finish"].map((label, i) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              i + 1 === step
                ? "bg-indigo-700 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {i + 1}
          </div>
          <span className="mt-2 text-sm font-medium">{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <header className="bg-indigo-700 text-white px-6 py-4 rounded">
        <h1 className="text-2xl font-bold">MTCC 1034 - Hybrid AGM 2025</h1>
      </header>

      <Stepper />

      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">
            Election of two (2) Directors to the Board
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaUser className="text-indigo-700" />
              <span>
                <strong>Member Info:</strong> {formData.name} ({formData.suite})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-indigo-700" />
              <span>
                <strong>When:</strong> Monday, May 26th, 2025 – 7:00 PM EDT
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-700" />
              <span>
                <strong>Where:</strong> In Person in Party Room & Virtually via
                GetQuorum
              </span>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-1">
                <FaDownload className="text-indigo-700" />
                <strong>Meeting Documents:</strong>
              </div>
              <ul className="list-disc list-inside text-red-600">
                {[
                  { name: "Virtual User Guide", size: "614.83 KB" },
                  { name: "Preliminary Notice", size: "272.62 KB" },
                  { name: "Notice of Annual General Meeting", size: "1.65 MB" },
                  { name: "Proxy Instructions", size: "1.66 MB" },
                  { name: "PIC with related attachments", size: "9.14 MB" },
                ].map((doc, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="underline hover:text-red-800 transition"
                    >
                      MTCC 1034: {doc.name} ({doc.size})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setStep(2)}
              className="bg-indigo-700 text-white px-6 py-3 rounded font-bold hover:bg-indigo-800 transition"
            >
              LET’S GET STARTED
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-xl font-semibold mb-2">
            Is your ownership information correct?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Please verify your records with the Corporation. If your information
            requires updating, please contact management.
          </p>
          <div className="space-y-4 text-sm text-gray-800">
            <div>
              {/* This is a JSX comment */}

              <div className="text-gray-500">Your Suite Address</div>
              <div className="border-b py-1">{formData.address}</div>
            </div>
            <div>
              <div className="text-gray-500">Your Suite Number</div>
              <div className="border-b py-1">{formData.suite}</div>
            </div>
            <div>
              <div className="text-gray-500">Your Name On Title</div>
              <div className="border-b py-1">{formData.name}</div>
            </div>
            <div>
              <div className="text-gray-500">Your Email Address</div>
              <div className="border-b py-1">{formData.email}</div>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              BACK
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 bg-indigo-700 text-white rounded"
            >
              NEXT STEP
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-xl font-semibold mb-2">
            Whom do you elect to the General Director positions on the board?
          </h2>
          <p className="text-sm text-gray-600 mb-2 italic">
            [2 seat(s) available]
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Please rank as many candidates as you wish. The individuals below
            have notified us of their intent to run.
          </p>
          <a href="#" className="text-indigo-600 underline text-sm mb-4 block">
            Click here for candidate resumes
          </a>

          <div className="space-y-2 mb-6">
            {nominees.map((name, idx) => (
              <div
                key={name}
                className="bg-indigo-600 text-white flex justify-between items-center px-4 py-2 rounded"
              >
                <div>
                  <FaUser className="inline-block mr-2" />
                  {name}{" "}
                  <span className="ml-2 text-xs font-semibold">
                    ({idx + 1} Choice)
                  </span>
                </div>
                <button onClick={() => removeNominee(name)}>
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              maxLength={100}
              value={customNominee}
              onChange={(e) => setCustomNominee(e.target.value)}
              className="flex-1 border px-3 py-2 rounded text-sm"
              placeholder="eg. John Smith"
            />
            <button
              onClick={handleNomineeAdd}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              ADD
            </button>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              BACK
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2 bg-indigo-700 text-white rounded"
            >
              NEXT STEP
            </button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-xl font-semibold mb-2">
            Whom do you appoint as your proxy holder?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Your proxy holder will attend the meeting and vote on your behalf.
            Enter their name or choose from the list:
          </p>

          {/* Manual Entry */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 block mb-1">
              Your proxy holder
            </label>
            <input
              type="text"
              value={proxyHolder}
              onChange={(e) => {
                setProxyHolder(e.target.value);
                setSelectedRep("");
              }}
              className="w-full border px-4 py-2 rounded"
              placeholder="eg. John Smith"
            />
          </div>

          {/* Preset Choices */}
          <div className="flex gap-4 mb-4">
            {[
              "President of the Corporation",
              "Secretary of the Corporation",
            ].map((rep) => (
              <button
                key={rep}
                onClick={() => {
                  setSelectedRep(rep);
                  setProxyHolder("");
                }}
                className={`flex items-center gap-2 px-4 py-2 border rounded ${
                  selectedRep === rep
                    ? "bg-indigo-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                <FaUser />
                {rep}
              </button>
            ))}
          </div>

          {/* Checkbox fallback */}
          <div className="mb-6">
            <label className="inline-flex items-start gap-2">
              <input
                type="checkbox"
                checked={fallbackEnabled}
                onChange={() => setFallbackEnabled(!fallbackEnabled)}
              />
              <span className="text-sm">
                Should my designated proxy holder fail to attend the meeting, I
                agree that the President or Secretary of the Corporation shall
                act as my fallback proxy holder.
              </span>
            </label>
          </div>

          {/* FAQ */}
          <div className="mt-4 border-t pt-4">
            <h3
              className="font-semibold text-sm text-indigo-700 mb-2 cursor-pointer"
              onClick={() => toggleFaq("q1")}
            >
              Frequently Asked Questions
            </h3>
            {[
              {
                id: "q1",
                question: "What is a proxy holder?",
                answer:
                  "A proxy holder is someone who votes on your behalf during the meeting.",
              },
              {
                id: "q2",
                question: "Who should I choose?",
                answer:
                  "Choose someone you trust or a corporate representative if available.",
              },
            ].map((faq) => (
              <div key={faq.id} className="mb-2">
                <button
                  className="w-full text-left text-sm font-medium text-gray-700"
                  onClick={() => toggleFaq(faq.id)}
                >
                  {faq.question}
                </button>
                {faqOpen === faq.id && (
                  <div className="text-sm text-gray-600 mt-1">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              BACK
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-4 py-2 bg-indigo-700 text-white rounded"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-xl font-semibold mb-4">Review Your Answers</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please review your answers before moving on to the final step.
          </p>

          <div className="space-y-6 text-sm">
            {/* Suite */}
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-indigo-700 mt-1" />
              <div>
                <div>
                  You are the owner / mortgagee of:{" "}
                  <strong>
                    {formData.suite} - {formData.address}
                  </strong>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-red-600 underline text-xs mt-1"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Nominees */}
            <div className="flex items-start gap-3">
              <FaUser className="text-indigo-700 mt-1" />
              <div>
                <div>
                  <strong>General Election:</strong> {nominees.join(", ")}
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="text-red-600 underline text-xs mt-1"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Proxy Holder */}
            <div className="flex items-start gap-3">
              <FaUser className="text-indigo-700 mt-1" />
              <div>
                <div>
                  <strong>Your appointed proxy holder is:</strong>{" "}
                  {proxyHolder || selectedRep || "N/A"}
                </div>
                <button
                  onClick={() => setStep(4)}
                  className="text-red-600 underline text-xs mt-1"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              BACK
            </button>
            <button
              onClick={() => setStep(6)}
              className="px-4 py-2 bg-indigo-700 text-white rounded"
            >
              NEXT STEP
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Legal Stuff */}
      {step === 6 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-black">
            The Legal Stuff
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Please review the sample form below before submitting. You may need
            to scroll to view the full content. A copy will be emailed to you
            upon submission.
          </p>

          {/* PDF Placeholder */}
          <div className="border rounded h-64 overflow-auto bg-gray-50 p-4 text-sm mb-6">
            <p className="text-gray-500 italic mb-2">
              📄 PDF spot – placeholder
            </p>
            <p>
              <strong>President of the Corporation</strong>
            </p>
            <p>I (we) revoke all proxies previously given.</p>
            <br />
            <p>Please check one of the three boxes below:</p>
            <ul className="list-disc list-inside mt-2">
              <li>
                [ ] The proxy is not authorized to vote on my (our) behalf with
                respect to any matter at the meeting, including matters of
                routine procedure.
              </li>
              <li>
                [ ] The proxy may vote only with respect to matters of routine
                procedure and no other matters.
              </li>
              <li>
                [ ] The proxy may nominate candidates or vote on all matters,
                subject to my instructions.
              </li>
            </ul>
          </div>

          {/* Signature */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Please sign by typing your name below:
            </label>
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="w-full px-4 py-2 border rounded text-black"
              placeholder="Type here to sign"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(5)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              BACK
            </button>
            <button
              onClick={() => {
                const collectedData = {
                  ...formData,
                  nominees,
                  proxyHolder: proxyHolder || selectedRep,
                  fallbackEnabled,
                  signature,
                };
                console.log("Collected Form Data:", collectedData);
                setStep(7);
              }}
              className="px-4 py-2 bg-indigo-700 text-white rounded"
              disabled={!signature}
            >
              SUBMIT FORM
            </button>
          </div>
        </div>
      )}

      {/* Step 7: Confirmation Screen */}
      {step === 7 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-center text-black">
          {/* Icon */}
          <div className="text-4xl text-indigo-700 mb-4">✅</div>

          {/* Message */}
          <h2 className="text-2xl font-bold mb-2">
            Your Form Has Been Received!
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            A copy has been emailed to you for your records.
          </p>

          <p className="text-sm text-gray-600 mb-2">
            Please contact us at{" "}
            <a
              href="mailto:support@getquorum.com"
              className="text-red-500 underline"
            >
              support@getquorum.com
            </a>{" "}
            if you haven’t received it within 24 hours. Check your spam or junk
            mail folder just in case.
          </p>

          {/* Download Button Placeholder */}
          <div className="mt-6">
            <button className="bg-indigo-700 text-white font-medium px-6 py-2 rounded hover:bg-indigo-800">
              ⬇ DOWNLOAD A COPY
            </button>
          </div>

          {/* Start Again */}
          <div className="mt-10">
            <p className="text-sm text-gray-600 mb-2">
              Want to change your answers? You can resubmit your vote at any
              time until voting is closed.
            </p>
            <button
              onClick={() => {
                // Optional: Reset all other state too
                setStep(1);
              }}
              className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600"
            >
              START AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
