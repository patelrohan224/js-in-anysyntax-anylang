import React, { useState } from "react";

const ConfigModal = ({ state, update }) => {
  const [formData, setFormData] = useState({ ...state?.config });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update({ config: formData, modal: false });
  };
  return (
    state?.modal && (
      <>
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabindex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full 
          md:flex md:justify-center"
        >
          <div className="relative w-full max-w-2xl max-h-full p-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <form onSubmit={handleSubmit} className="">
                <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Config your syntax in any language
                  </h3>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="static-modal"
                    onClick={() => update({ modal: false })}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 space-y-4 md:p-5">
                  <div className="flex flex-col mb-4 ">
                    <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                      <span className="w-14">let</span>
                      <input
                        type="text"
                        name="let"
                        placeholder="let"
                        value={formData.let}
                        onChange={handleInputChange}
                        className="py-2 pl-4 pr-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-4 ">
                    <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                      <span className="w-14">var</span>
                      <input
                        type="text"
                        name="var"
                        placeholder="var"
                        value={formData.var}
                        onChange={handleInputChange}
                        className="py-2 pl-4 pr-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-4 ">
                    <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                      <span className="w-14">const</span>
                      <input
                        type="text"
                        name="const"
                        placeholder="const"
                        value={formData.const}
                        onChange={handleInputChange}
                        className="py-2 pl-4 pr-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                      <span className="w-14">print</span>
                      <input
                        type="text"
                        name="print"
                        placeholder="print"
                        value={formData.print}
                        onChange={handleInputChange}
                        className="py-2 pl-4 pr-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mb-4">
                    <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                      <span className="w-14">function</span>
                      <input
                        type="text"
                        name="function"
                        placeholder="function"
                        value={formData.function}
                        onChange={handleInputChange}
                        className="py-2 pl-4 pr-4 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 border-t border-gray-200 rounded-b md:p-5 dark:border-gray-600">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Submit
                  </button>
                  <button
                    data-modal-hide="static-modal"
                    type="button"
                    className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => update({ modal: false })}
                  >
                    Cancel
                  </button>
                  <div className="ml-10 text-green-700">dont use spaces</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ConfigModal;
