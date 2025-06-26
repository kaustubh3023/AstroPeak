import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().optional(),
  birthDate: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      birthDate: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Consultation Request Sent!",
      description: "Thank you for your consultation request! We will contact you within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-mystic-navy" style={{ background: 'linear-gradient(to bottom, hsl(216, 47%, 8%) 0%, hsl(236, 45%, 16%) 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: 'hsl(43, 74%, 52%)' }}>
                Begin Your Journey
              </h2>
              <div className="w-24 h-1 gold-gradient rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ready to unlock the mysteries of your destiny? Reach out for a personalized consultation that will illuminate your path forward.
              </p>
            </div>
            
            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="card-3d p-6 rounded-xl border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-300" style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.3)' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 rounded border-2" style={{ borderColor: 'hsl(216, 47%, 8%)' }}></div>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>Phone Consultation</h4>
                    <p className="text-gray-300">+91 98765 43210</p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d p-6 rounded-xl border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-300" style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.3)' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <div className="w-5 h-3 border-2 border-b-0" style={{ borderColor: 'hsl(216, 47%, 8%)' }}></div>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>Email</h4>
                    <p className="text-gray-300">info@shrishrreeastro.com</p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d p-6 rounded-xl border border-yellow-600/20 hover:border-yellow-600/50 transition-all duration-300" style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.3)' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'hsl(216, 47%, 8%)' }}>
                      <div className="w-2 h-2" style={{ backgroundColor: 'hsl(216, 47%, 8%)' }}></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>Consultation Hours</h4>
                    <p className="text-gray-300">Mon-Sun: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="card-3d p-8 rounded-2xl border border-yellow-600/20" style={{ background: 'linear-gradient(135deg, hsla(236, 45%, 16%, 0.5) 0%, hsla(216, 47%, 8%, 0.5) 100%)' }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                          First Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                            className="bg-mystic-navy/50 border-yellow-600/30 text-gray-100 focus:border-yellow-500"
                            style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)', borderColor: 'hsla(43, 74%, 52%, 0.3)' }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                          Last Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                            className="bg-mystic-navy/50 border-yellow-600/30 text-gray-100 focus:border-yellow-500"
                            style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)', borderColor: 'hsla(43, 74%, 52%, 0.3)' }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          {...field}
                          className="bg-mystic-navy/50 border-yellow-600/30 text-gray-100 focus:border-yellow-500"
                          style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)', borderColor: 'hsla(43, 74%, 52%, 0.3)' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                          className="bg-mystic-navy/50 border-yellow-600/30 text-gray-100 focus:border-yellow-500"
                          style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)', borderColor: 'hsla(43, 74%, 52%, 0.3)' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                        Service of Interest
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-mystic-navy/50 border-yellow-600/30 text-gray-100" style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)', borderColor: 'hsla(43, 74%, 52%, 0.3)' }}>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="vedic-astrology">Vedic Astrology</SelectItem>
                          <SelectItem value="numerology">Numerology Analysis</SelectItem>
                          <SelectItem value="tarot">Tarot Reading</SelectItem>
                          <SelectItem value="name-correction">Name Correction</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                        Birth Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-mystic-navy/50 border-yellow-600/30 text-gray-100 focus:border-yellow-500"
                          style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)', borderColor: 'hsla(43, 74%, 52%, 0.3)' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold" style={{ color: 'hsl(43, 74%, 52%)' }}>
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell us about your specific questions or concerns..."
                          {...field}
                          className="bg-mystic-navy/50 border-yellow-600/30 text-gray-100 focus:border-yellow-500 resize-none"
                          style={{ backgroundColor: 'hsla(236, 45%, 16%, 0.5)', borderColor: 'hsla(43, 74%, 52%, 0.3)' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full card-3d gold-gradient py-4 text-lg font-semibold hover:shadow-2xl transition-all duration-300"
                  style={{ color: 'hsl(216, 47%, 8%)' }}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    'Send Consultation Request'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
