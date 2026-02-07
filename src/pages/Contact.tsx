import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "918141085418";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappMessage = `Hello Corelink 👋

📌 *New Enquiry from Website*

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
🏢 Business: ${formData.business || "Not Provided"}

📝 Message:
${formData.message}

— Sent from Contact Form`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank",
    );

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto container-padding text-center">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-display font-heading mt-4 mb-6">
              Let's Build Your <br />
              <span className="gradient-text">Brand Together</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your digital presence? We'd love to hear from
              you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="pb-24">
          <div className="container mx-auto container-padding">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-heading font-semibold mb-8">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="h-12 rounded-xl bg-secondary border-transparent focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="h-12 rounded-xl bg-secondary border-transparent focus:border-accent"
                      />
                    </div>
                  </div>

                  {/* NEW PHONE FIELD */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="h-12 rounded-xl bg-secondary border-transparent focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Business/Brand Name
                    </label>
                    <Input
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="h-12 rounded-xl bg-secondary border-transparent focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project and goals..."
                      required
                      rows={6}
                      className="rounded-xl bg-secondary border-transparent focus:border-accent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Opening WhatsApp..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:pl-8"
              >
                <h2 className="text-2xl font-heading font-semibold mb-8">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <a
                        href="mailto:corelink.services@gmail.com"
                        className="text-muted-foreground hover:text-accent"
                      >
                        corelink.services@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <a
                        href="tel:+918141085418"
                        className="text-muted-foreground hover:text-accent"
                      >
                        +91 81410 85418
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Ahmedabad, Gujarat, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-secondary">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Response Time:
                    </span>{" "}
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
