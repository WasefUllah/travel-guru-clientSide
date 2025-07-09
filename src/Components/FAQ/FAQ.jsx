import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../URL/baseUrl";

const FAQ = () => {
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/faq`)
      .then((res) => {
        setFaq(res.data);
      })
      .catch();
  }, []);
  return (
    <div>
      <div className="my-10">
        <h1 className="text-primary text-2xl md:text-4xl lg:text-6xl font-bold my-4">
          FAQ
        </h1>
        <div className="join join-vertical bg-base-100 w-full">
          {faq.map((f) => (
            <div className="collapse collapse-plus bg-base-100 border border-base-300 ">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">{f.question}</div>
              <div className="collapse-content text-sm">{f.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
