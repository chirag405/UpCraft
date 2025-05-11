"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
  PlayCircle,
  BrainCircuit,
  Briefcase,
  LineChart,
  ScrollText,
} from "lucide-react";
import HeroSection from "@/components/hero";
import { testimonial } from "@/data/testimonial";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";
import { motion } from "@/lib/motion-wrapper";
import { features } from "@/data/features";

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-sky-950"
          >
            Powerful Features for Your Career Growth
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border border-sky-100 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden">
                  <CardContent className="pt-8 pb-6 text-center flex flex-col items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-sky-100 rounded-full mb-4 text-sky-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-sky-950">
                      {feature.title}
                    </h3>
                    <p className="text-sky-700">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 bg-gradient-to-br from-sky-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            {[
              { value: "50+", label: "Industries Covered" },
              { value: "1000+", label: "Interview Questions" },
              { value: "95%", label: "Success Rate" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                  {stat.value}
                </h3>
                <p className="text-sky-700 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-950">
              How It Works
            </h2>
            <p className="text-sky-700 text-lg">
              Four simple steps to accelerate your career growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl text-sky-950">{item.title}</h3>
                <p className="text-sky-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gradient-to-br from-sky-50 to-blue-100">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-sky-950"
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-0 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <CardContent className="pt-8 pb-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="relative h-14 w-14 flex-shrink-0">
                          <Image
                            width={56}
                            height={56}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="rounded-full object-cover border-2 border-sky-200"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sky-950">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-sky-700">
                            {testimonial.role}
                          </p>
                          <p className="text-sm font-medium text-sky-600">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote>
                        <p className="text-sky-700 relative leading-relaxed">
                          <span className="text-3xl text-sky-400 absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-sky-400 absolute -bottom-4">
                            &quot;
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-950">
              Frequently Asked Questions
            </h2>
            <p className="text-sky-700 text-lg">
              Find answers to common questions about our platform
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-sky-100"
                >
                  <AccordionTrigger className="text-left text-sky-950 hover:text-sky-600 py-5 font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sky-700 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-white/90 max-w-[600px] text-lg md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                className="mt-4 h-14 bg-white text-sky-600 hover:bg-sky-50 text-lg font-medium rounded-full px-8 transition-all hover:shadow-lg"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
