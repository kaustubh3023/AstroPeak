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
import { SERVICES } from '@/lib/constants';
import { 
  BarChart3, Calculator, Smartphone, Type, CreditCard, 
  Edit, Clock, Coins, PenTool, ArrowLeft, X 
} from 'lucide-react';

const serviceFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  birthDate: z.string().optional(),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional(),
  specificQuestions: z.string().optional(),
  preferredTime: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

export default function ServiceSelection() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      birthTime: '',
      birthPlace: '',
      specificQuestions: '',
      preferredTime: '',
      additionalNotes: '',
    },
  });

  const getIcon = (iconName: string) => {
    const iconProps = { size: 24, className: "text-current" };
    switch(iconName) {
      case 'chart': return <BarChart3 {...iconProps} />;
      case 'calculator': return <Calculator {...iconProps} />;
      case 'smartphone': return <Smartphone {...iconProps} />;
      case 'type': return <Type {...iconProps} />;
      case 'cards': return <CreditCard {...iconProps} />;
      case 'edit': return <Edit {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      case 'coins': return <Coins {...iconProps} />;
      case 'pen-tool': return <PenTool {...iconProps} />;
      default: return <BarChart3 {...iconProps} />;
    }
  };

  // ✅ UPDATED SUBMIT HANDLER WITH UID CHECK
  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);

    try {
      const uid = localStorage.getItem('uid'); // ✅ Get UID from localStorage
      if (!uid) {
        toast({
          title: "Login Required",
          description: "Please log in before booking a service.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const serviceData = {
        ...data,
        uid, // ✅ Include UID
        serviceName: selectedService?.name || 'Unknown Service',
        
      };

      const response = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: `${selectedService.name} Consultation Request Sent!`,
          description: "Thank you for your consultation request! We will contact you within 24 hours.",
        });
        form.reset();
        setSelectedService(null);
      } else {
        throw new Error(result.message || 'Failed to send service request');
      }
    } catch (error) {
      console.error('Error submitting service request:', error);
      toast({
        title: "Error",
        description: "Failed to send your service request. Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    form.reset();
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    form.reset();
  };

  // ---------------------------------------------
  // SERVICE FORM VIEW
  // ---------------------------------------------
  if (selectedService) {
    return (
      <section
        id="service-selection"
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 pointer-events-auto"
        style={{ backgroundColor: '#f9f6f0' }}
      >
        <div className="max-w-4xl mx-auto relative z-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBackToServices}
              className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Services</span>
            </button>
            <button
              onClick={handleBackToServices}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Service Info */}
          <div className="p-8 rounded-2xl border border-yellow-600/30 mb-8 bg-white/90 backdrop-blur">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center">
                <div style={{ color: 'hsl(0, 0.00%, 0.00%)' }}>
                  {getIcon(selectedService.icon)}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-yellow-600">
                  {selectedService.name}
                </h2>
                <p className="text-xl text-gray-700">
                  {selectedService.price}
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {selectedService.description}
            </p>
          </div>

          {/* Booking Form */}
          <div className="p-8 rounded-2xl border border-yellow-600/30 bg-white/90 backdrop-blur relative z-20 pointer-events-auto">
            <h3 className="text-2xl font-display font-bold mb-6 text-black">
              Book Your Consultation
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">First Name *</FormLabel>
                      <FormControl><Input className="text-black" placeholder="Enter your first name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Last Name *</FormLabel>
                      <FormControl><Input className="text-black" placeholder="Enter your last name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Email *</FormLabel>
                      <FormControl><Input className="text-black" type="email" placeholder="Enter your email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Phone *</FormLabel>
                      <FormControl><Input className="text-black" type="tel" placeholder="Enter your phone" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <FormField control={form.control} name="birthDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Birth Date</FormLabel>
                      <FormControl><Input className="text-black" type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="birthTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Birth Time</FormLabel>
                      <FormControl><Input className="text-black" type="time" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="birthPlace" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Birth Place</FormLabel>
                      <FormControl><Input className="text-black" placeholder="City, State" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="specificQuestions" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Specific Questions</FormLabel>
                    <FormControl><Textarea className="text-black" rows={4} placeholder="Any specific question..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="preferredTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Preferred Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select time" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 3 PM)</SelectItem>
                          <SelectItem value="evening">Evening (3 PM - 6 PM)</SelectItem>
                          <SelectItem value="night">Night (6 PM - 8 PM)</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="additionalNotes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Additional Notes</FormLabel>
                      <FormControl><Textarea className="text-black" rows={3} placeholder="Any extra info..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative z-20 w-full card-3d gold-gradient py-4 text-lg font-semibold hover:shadow-2xl transition-all duration-300 pointer-events-auto"
                  style={{ color: 'hsl(216, 47%, 8%)' }}
                >
                  {isSubmitting ? 'Sending Consultation Request...' : `Book ${selectedService.name} Consultation`}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    );
  }

  // ---------------------------------------------
  // SERVICE LIST VIEW
  // ---------------------------------------------
  return (
    <section
      id="service-selection"
      className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 pointer-events-auto"
      style={{ backgroundColor: '#f9f6f0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-black">
            Choose Your Service
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Select from our comprehensive range of divine services and begin your journey towards clarity and purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              onClick={() => handleServiceSelect(service)}
              className="cursor-pointer p-8 rounded-2xl border border-gray-200 hover:border-yellow-500 shadow-sm hover:shadow-md transition-all duration-500 group bg-white pointer-events-auto relative z-20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center space-y-6">
                <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <div style={{ color: 'hsl(216, 47%, 8%)' }}>{getIcon(service.icon)}</div>
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900">{service.name}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <span className="font-semibold text-gray-700">{service.price}</span>
                <div className="pt-4">
                  <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                    Click to Book →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
