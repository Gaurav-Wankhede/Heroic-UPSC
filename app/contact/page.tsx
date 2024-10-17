"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Github, Instagram, Linkedin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          to: 'gauravanilwankhede2002@gmail.com',
        }),
      });

      if (response.ok) {
        toast({
          title: 'Message Sent',
          description: 'Thank you for your message. I will get back to you soon!',
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.message || 'Something went wrong. Please try again later.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send the message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl p-8">
        <div className='flex flex-col md:flex-row'>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <ul className="space-y-2">
              <li className='py-2'>Email: gauravwankhede2002@gmail.com</li>
              <li className='py-2'>Phone: +91 8530341845</li>
              <li className='py-2'>Location: Boisar, Maharashtra, India</li>
              <div className="flex space-x-4 mt-2">
                <a href="https://www.linkedin.com/in/gaurav-wankhede-5244101b8/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                  <Linkedin size={24} className="md:w-8 md:h-8" />
                </a>
                <a href="https://github.com/Gaurav-Wankhede" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                  <Github size={24} className="md:w-8 md:h-8" />
                </a>
                <a href="https://www.instagram.com/_gaurav_wankhede_/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                  <Instagram size={24} className="md:w-8 md:h-8" />
                </a>
              </div>
            </ul>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
