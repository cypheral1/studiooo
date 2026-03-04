import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Container } from '@/components/container';

const faqs = [
  {
    question: 'How do I verify my cosmetic product?',
    answer:
      'Simply navigate to the "Upload & Check" section, upload a clear photo of your product, a picture of its barcode, and enter the batch code found on the packaging. Our AI system will analyze the data and provide an authenticity report.',
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
      'Yes, our basic product verification service is completely free to use. We believe everyone has the right to know if their products are safe and authentic.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-secondary">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight text-secondary-foreground sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-secondary-foreground/80">
            Have questions? We have answers. Here are some of the most common inquiries we receive.
          </p>
        </div>
        <div className="mt-16 mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-secondary-foreground/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
