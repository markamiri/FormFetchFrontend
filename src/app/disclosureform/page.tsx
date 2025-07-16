"use client";
import { FaUser, FaCalendar, FaMapMarkerAlt, FaDownload } from "react-icons/fa";
import React, { useState, Suspense } from "react";
//import { useSearchParams } from "next/navigation";
//import { useMemo } from "react";
import DisclosureFormSearchParams from "./DisclosureFormClient";

function Page() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const [isOwner, setIsOwner] = useState<boolean | null>(null); // true / false
  const [isInArrears, setIsInArrears] = useState<boolean | null>(null); // true / false
  const [isOccupant, setIsOccupant] = useState<boolean | null>(null); // true / false
  const [legalProceedings, setLegalProceedings] = useState<boolean | null>(
    null
  );
  const [condoConviction, setCondoConviction] = useState<boolean | null>(null);
  const [conflictOfInterest, setConflictOfInterest] = useState<boolean | null>(
    null
  );
  const [conflictWithDeclarant, setConflictWithDeclarant] = useState<
    boolean | null
  >(null);

  const [to, setTo] = useState("");
  const [deadline, setDeadline] = useState<string | null>(null);

  const [address, setAddress] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      [".pdf", ".doc", ".docx"].some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      )
    );

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleEmailSubmit = async (name: string) => {
    const formData = new FormData();
    formData.append("name", name);
    uploadedFiles.forEach((file) => {
      formData.append("files", file); // all files under "files"
    });

    try {
      const res = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        body: formData, // 🔁 send files as FormData
      });

      const result = await res.json();
      console.log("✅ Email Response:", result);
      alert("Email sent.");
    } catch (err) {
      console.error("❌ Error calling email endpoint:", err);
    }
  };

  const handleSubmit = async () => {
    const completeFormData = {
      name,
      address,
      to,
      isOwner,
      isInArrears,
      isOccupant,
      legalProceedings,
      condoConviction,
      conflictOfInterest,
      conflictWithDeclarant,
    };

    console.log("Final Form Data (Ready to Submit):", completeFormData);
    try {
      const res = await fetch(
        "http://localhost:5000/api/submit-disclosure-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeFormData),
        }
      );

      const result = await res.json();
      console.log("✅ Backend Response:", result);
      setStep(8);
    } catch (err) {
      console.error("❌ Error submitting to backend:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Pull values from URL on load */}
      <Suspense fallback={null}>
        <DisclosureFormSearchParams
          onExtract={(to: string, deadline: string | null) => {
            setTo(to);
            setDeadline(deadline);
          }}
        />
      </Suspense>

      <header className="bg-indigo-700 text-white px-6 py-4 rounded">
        <h1 className="text-2xl font-bold">Form Fetch</h1>
      </header>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">
            📝 Candidate Disclosure Form Submission
          </h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-sm mb-6">
            <div className="flex items-start gap-3">
              <span className="text-yellow-600 text-xl">📣</span>
              <div>
                <h2 className="font-semibold text-yellow-800 mb-1">
                  What is this for?
                </h2>
                <p className="text-gray-800">
                  In accordance with Section 29(1)(f) of the Condominium Act,
                  1998, all individuals seeking election to the Board of
                  Directors must submit a completed{" "}
                  <strong>Candidate Disclosure Form</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaUser className="text-indigo-700" />
              <span>
                <strong>To:</strong> {to}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendar className="text-indigo-700" />
              <span>
                <strong>Deadline:</strong> {deadline}
              </span>
            </div>
            <div className=" items-center gap-2 hidden">
              <FaMapMarkerAlt className="text-indigo-700" />
              <span>
                <strong>How:</strong> Submit this form online prior to the
                meeting
              </span>
            </div>
            <div className="mt-4 hidden">
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

      {/* STEP 2 */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">Enter Your Details</h2>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 px-3 py-2 border-b border-gray-400 focus:outline-none focus:border-black"
              placeholder="Enter your full name"
            />
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-gray-100 px-3 py-2 border-b border-gray-400 focus:outline-none focus:border-black"
              placeholder="Enter your address"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Go Back
            </button>

            <button
              onClick={() => {
                if (!name.trim() || !address.trim()) {
                  alert("Please enter your full name and address.");
                  return;
                }
                setStep(3);
              }}
              className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">
            Step 1 & 2: Ownership & Occupancy Status
          </h2>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="p-4 bg-white rounded shadow-md">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-800">
                  1. I am a registered owner of a unit in the Corporation.
                </p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isOwner"
                      checked={isOwner === true}
                      onChange={() => setIsOwner(true)}
                      className="w-4 h-4 accent-indigo-700"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isOwner"
                      checked={isOwner === false}
                      onChange={() => setIsOwner(false)}
                      className="w-4 h-4 accent-indigo-700"
                    />
                    No
                  </label>
                </div>
              </div>

              {/* Sub-question (only if owner is true) */}
              {isOwner === true && (
                <div className="mt-3 pl-4 border-l-4 border-indigo-300">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm text-gray-700 max-w-[70%]">
                      The contributions to the common expenses payable for my
                      unit(s) are in arrears for 60 days or more.
                    </p>
                    <div className="flex items-center gap-4 whitespace-nowrap">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isInArrears"
                          checked={isInArrears === true}
                          onChange={() => setIsInArrears(true)}
                          className="w-4 h-4 accent-indigo-700"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isInArrears"
                          checked={isInArrears === false}
                          onChange={() => setIsInArrears(false)}
                          className="w-4 h-4 accent-indigo-700"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-4 bg-white rounded shadow-md">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">
                  2. I am an occupant of a unit in the Corporation.
                </p>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isOccupant"
                      checked={isOccupant === true}
                      onChange={() => setIsOccupant(true)}
                      className="w-4 h-4 accent-indigo-700"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isOccupant"
                      checked={isOccupant === false}
                      onChange={() => setIsOccupant(false)}
                      className="w-4 h-4 accent-indigo-700"
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Go Back
            </button>
            <button
              onClick={() => {
                if (isOwner === null) {
                  alert("Please answer whether you are a registered owner.");
                  return;
                }
                if (isOwner === true && isInArrears === null) {
                  alert("Please answer the arrears question.");
                  return;
                }
                if (isOccupant === null) {
                  alert("Please answer whether you are an occupant.");
                  return;
                }
                setStep(4);
              }}
              className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">
            Step 3: Legal Proceedings
          </h2>

          <div className="p-4 bg-white rounded shadow-md mb-4">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm text-gray-800 font-medium  leading-relaxed">
                3. I, my spouse, my child, my parent, <br />
                my spouse&#39;s child, my spouse&#39;s parent, <br />
                an occupier of a unit I own, <br />
                an occupier of a unit my spouse owns, <br />
                and/or someone with whom I occupy a unit <br />
                is/are a party to a legal action to which the Corporation is a
                party.
              </p>
              <div className="flex items-center gap-4 whitespace-nowrap">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="legalProceedings"
                    checked={legalProceedings === true}
                    onChange={() => setLegalProceedings(true)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="legalProceedings"
                    checked={legalProceedings === false}
                    onChange={() => setLegalProceedings(false)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(3)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Go Back
            </button>
            <button
              onClick={() => {
                if (legalProceedings === null) {
                  alert("Please answer the legal proceedings question.");
                  return;
                }
                setStep(5);
              }}
              className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">
            Step 4: Condominium Act Convictions
          </h2>

          <div className="p-4 bg-white rounded shadow-md mb-4">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm leading-relaxed text-gray-800 font-medium max-w-[70%]">
                4. Within the past 10 years, I have been convicted of an offence
                under the Condominium Act, 1998, as amended or under the
                regulations to the Condominium Act, 1998, as amended.
              </p>
              <div className="flex items-center gap-4 whitespace-nowrap">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="condoConviction"
                    checked={condoConviction === true}
                    onChange={() => setCondoConviction(true)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="condoConviction"
                    checked={condoConviction === false}
                    onChange={() => setCondoConviction(false)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(4)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Go Back
            </button>
            <button
              onClick={() => {
                if (condoConviction === null) {
                  alert(
                    "Please answer the Condominium Act convictions question."
                  );
                  return;
                }
                setStep(6);
              }}
              className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 */}
      {step === 6 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">
            Step 5: Conflicts of Interest with the Corporation
          </h2>

          <div className="p-4 bg-white rounded shadow-md mb-4">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm leading-relaxed text-gray-800 font-medium max-w-[70%]">
                5. I have a material interest, either directly or indirectly, in
                a material contract or transaction to which the Corporation is a
                party (other than in my capacity as a purchaser, mortgagee,
                owner, or occupier of a unit).
              </p>
              <div className="flex items-center gap-4 whitespace-nowrap">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="conflictOfInterest"
                    checked={conflictOfInterest === true}
                    onChange={() => setConflictOfInterest(true)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="conflictOfInterest"
                    checked={conflictOfInterest === false}
                    onChange={() => setConflictOfInterest(false)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(5)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Go Back
            </button>
            <button
              onClick={() => {
                if (conflictOfInterest === null) {
                  alert("Please answer the conflict of interest question.");
                  return;
                }
                setStep(7);
              }}
              className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 7 */}
      {step === 7 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-3xl mx-auto text-black">
          <h2 className="text-lg font-semibold mb-4">
            Step 6: Conflicts of Interest with the Declarant
          </h2>

          <div className="p-4 bg-white rounded shadow-md mb-4">
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm leading-relaxed text-gray-800 font-medium max-w-[70%]">
                6. I have a material interest, either directly or indirectly, in
                a material contract or transaction to which the declarant or an
                affiliate of the declarant is a party (other than in my capacity
                as a purchaser, mortgagee, owner, or occupier of a unit).
              </p>
              <div className="flex items-center gap-4 whitespace-nowrap">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="conflictWithDeclarant"
                    checked={conflictWithDeclarant === true}
                    onChange={() => setConflictWithDeclarant(true)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="conflictWithDeclarant"
                    checked={conflictWithDeclarant === false}
                    onChange={() => setConflictWithDeclarant(false)}
                    className="w-4 h-4 accent-indigo-700"
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(6)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Go Back
            </button>
            <button
              onClick={() => {
                if (conflictWithDeclarant === null) {
                  alert("Please answer the conflict with declarant question.");
                  return;
                }
                handleSubmit();
              }}
              className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 8 */}
      {step === 8 && (
        <div className="bg-white shadow-md rounded p-6 mt-10 max-w-4xl mx-auto text-black">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
            ✅ Form Completed
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Please review your submission below.
          </p>

          {/* PDF Placeholder */}
          <div className="border border-gray-300 rounded shadow p-4 bg-gray-50 mb-8">
            <iframe
              src="http://localhost:5000/api/final-disclosure-pdf"
              title="Preview PDF"
              width="100%"
              height="600px"
              className="border rounded shadow mb-6"
            />
          </div>

          {/* Drag & Drop Upload Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">
              Upload Supporting Documents
            </h3>
            <div
              className="w-full border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer bg-white hover:bg-gray-50 transition"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                handleFileUpload(files);
              }}
            >
              <p className="text-gray-600">
                Drag & drop PDF or Word documents here, or click to upload
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                className="hidden"
                id="fileUpload"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer block mt-2 text-indigo-600 underline"
              >
                Browse files
              </label>
            </div>

            <ul className="mt-4 text-left text-sm text-gray-700 space-y-1">
              {uploadedFiles.map((file, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-red-500 text-base">📄</span>
                  <span className="hover:underline">{file.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => handleEmailSubmit(name)}
              className="bg-indigo-700 text-white px-6 py-3 rounded font-bold hover:bg-indigo-800 transition"
            >
              Submit PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
