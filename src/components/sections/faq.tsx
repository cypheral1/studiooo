import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Container } from '@/components/container';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I verify my cosmetic product?',
    answer:
      'Simply go to the "Verify Product" section, upload a clear photo of your product, a picture of its barcode, and enter the batch code from the packaging. Our AI system will analyze the data and provide an authenticity report within 30 seconds!',
  },
  {
    question: 'How long does verification take?',
    answer:
      'Our AI-powered verification is incredibly fast. You should receive your authenticity report within 30-60 seconds after submitting your product details.',
  },
  {
    question: 'What if my product is identified as fake?',
    answer:
      'If your product is identified as suspicious or fake, our report will provide details on why. We recommend you stop using the product immediately, contact the seller for a refund, and report them. Our "Where to Buy" section lists trusted retailers for future purchases.',
  },
  {
    question: 'Is the TrueOriginalShop verification service free?',
    answer:
      'Yes! Our product verification service is completely free to use. We believe everyone has the right to know if their products are safe and authentic. No hidden charges, no premium tier — just free verification.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-black/60 backdrop-blur-sm relative border-y border-primary/20">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-12">
          <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/30 uppercase tracking-widest">
            <HelpCircle className="h-3.5 w-3.5" />
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl uppercase">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="mt-4 text-white/70">
            Everything you need to know about our verification process.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-black/50 border border-primary/20 rounded-2xl px-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] data-[state=open]:border-primary/50 transition-all backdrop-blur-md"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-white/90 hover:no-underline py-5 hover:text-primary transition-colors tracking-wide">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/60 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
