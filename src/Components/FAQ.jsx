import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is LearnLoop?",
    answer:
      "LearnLoop is an innovative online learning platform that connects teachers and students through interactive educational experiences.",
  },
  {
    question: "Is LearnLoop free to use?",
    answer:
      "Yes! Many features are free, and premium features may be introduced later.",
  },
  {
    question: "How do I join a class on LearnLoop?",
    answer: "Sign up and use the class code shared by your teacher.",
  },
  {
    question: "Can I access LearnLoop on mobile?",
    answer: "Yes! We are launching a mobile app for iOS and Android soon.",
  },
  {
    question: "Is my data safe on LearnLoop?",
    answer:
      "Absolutely. We prioritize user privacy and use industry-standard security measures.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-[#f8fbff] to-[#ffffff] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-12 h-full w-full rounded-3xl shadow-lg">
      {/* Left Illustration */}
      <div className="flex-1 flex justify-center">
        <img
          src="./FAQ.svg"
          alt="FAQ Illustration"
          className="w-[320px] md:w-[400px] drop-shadow-xl"
        />
      </div>

      {/* Right FAQ */}
      <div className="flex-1 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md transition-all"
            >
              <button
                className="w-full flex justify-between items-center p-4 text-lg font-medium text-gray-700"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-blue-600"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-4 pb-4 text-gray-600 text-base leading-relaxed bg-gray-50"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
