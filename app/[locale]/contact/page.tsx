'use client';
import ContactForm from '@/app/components/contact/Contact_form';
import ContactSection from '../../components/contact/Contact_info';
import Container from '../../components/layout/Container';
import PageHeader from '../../components/layout/PageHeader';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');


  return (
    <div className="bg-[#fafafa]">
        <PageHeader slug="contact" />
      
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ContactSection />
          <ContactForm/>
        </div>
      </Container>
    </div>
  );
}
