import { useState } from "react";

const faqs = [
    { question: "Where is my order?", answer: "You can track your active order from the Orders section until it reaches your doorstep." },
    { question: "How do I apply a coupon?", answer: "Choose an offer, copy the coupon code, and apply it on the checkout page before payment." },
    { question: "Can I cancel my order?", answer: "Cancellation depends on restaurant preparation status. Contact support immediately for time-sensitive requests." },
    { question: "What if an item is missing?", answer: "Open your order details or contact support with the order ID and we will help resolve the issue." }
];

const Help = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <main className="support-page help-page">
            <section className="support-hero help-hero">
                <div>
                    <span className="section-kicker">We’re here for you</span>
                    <h1>How can we help?</h1>
                    <p>Find answers or reach out to our support team.</p>
                </div>
                <div className="help-search"><span aria-hidden="true">⌕</span><input aria-label="Search help topics" placeholder="Search for help topics" /></div>
            </section>

            <section className="help-layout">
                <div className="help-main">
                    <div className="support-section-heading"><div><span className="section-kicker">Popular questions</span><h2>Frequently asked questions</h2></div></div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <article className={`faq-card${openIndex === index ? " open" : ""}`} key={faq.question}>
                                <button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)} aria-expanded={openIndex === index}>
                                    <span>{faq.question}</span><b>{openIndex === index ? "−" : "+"}</b>
                                </button>
                                {openIndex === index && <p>{faq.answer}</p>}
                            </article>
                        ))}
                    </div>
                </div>
                <aside className="help-contact-card">
                    <span className="help-contact-icon" aria-hidden="true">🎧</span>
                    <h3>Still need help?</h3>
                    <p>Our support team is available every day from 8 AM to 11 PM.</p>
                    <button type="button">Chat with support</button>
                    <a href="mailto:support@yummygo.example">support@yummygo.example</a>
                </aside>
            </section>
        </main>
    );
};

export default Help;
