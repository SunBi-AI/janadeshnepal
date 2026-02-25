'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, User, FileText, Upload, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { useTranslations, useLocale } from 'next-intl';
import MetaTags from '@/app/components/layout/MetaTags';
import { buildApiUrl } from '@/lib/config';

const MembershipFormBasic = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const locale = useLocale();

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    province: '',
    district: '',
    municipality: '',
    ward: '',
    tole: '',
    citizenshipNo: '',
    photo: null as File | null,
    citizenship: null as File | null,
    occupation: '',
    motivation: '',
    agreed: false,
  });

  const steps = [
    { id: 1, title: locale === 'np' ? 'व्यक्तिगत विवरण' : 'Personal Information', icon: User },
    { id: 2, title: locale === 'np' ? 'ठेगाना विवरण' : 'Address Information', icon: FileText },
    { id: 3, title: locale === 'np' ? 'कागजात अपलोड' : 'Document Upload', icon: Upload },
    { id: 4, title: locale === 'np' ? 'समीक्षा र पेश' : 'Review & Submit', icon: CheckCircle },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const getRequiredFieldsForStep = (step: number) => {
    if (step === 1) {
      return ['fullName', 'fatherName', 'motherName', 'dob', 'gender', 'phone'];
    }
    if (step === 2) {
      return ['province', 'district', 'municipality', 'ward', 'tole'];
    }
    if (step === 3) {
      return ['citizenshipNo', 'photo', 'citizenship'];
    }
    return [];
  };

  const isStepValid = (step: number) => {
    const requiredFields = getRequiredFieldsForStep(step);
    return requiredFields.every((field) => {
      const value = formData[field as keyof typeof formData];
      if (value instanceof File) return true;
      return value !== null && String(value).trim() !== '';
    });
  };

  const nextStep = () => {
    if (!isStepValid(currentStep)) {
      alert(
        locale === 'np'
          ? 'कृपया सबै आवश्यक विवरण भर्नुहोस्।'
          : 'Please fill in all required fields.'
      );
      return;
    }
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreed) {
      alert(locale === 'np' ? 'कृपया नियम र सर्त स्वीकार गर्नुहोस्।' : 'Please accept the terms and conditions.');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('membership_type', 'member'); // adjust dynamically if needed
      payload.append('full_name', formData.fullName);
      payload.append('father_name', formData.fatherName);
      payload.append('mother_name', formData.motherName);
      payload.append('date_of_birth', formData.dob);
      payload.append('gender', formData.gender);
      payload.append('phone_number', formData.phone);
      payload.append('email', formData.email);
      payload.append('province', formData.province);
      payload.append('district', formData.district);
      payload.append('municipality', formData.municipality);
      payload.append('ward_number', formData.ward);
      payload.append('village_settlement', formData.tole || '');
      payload.append('address', `${formData.tole}, ${formData.municipality}, ${formData.district}, ${formData.province}`);
      payload.append('citizenship_number', formData.citizenshipNo || '');
      payload.append('terms_accepted', formData.agreed ? 'true' : 'false');
      if (formData.photo) payload.append('passport_photo', formData.photo);
      if (formData.citizenship) payload.append('citizenship_copy', formData.citizenship);
      payload.append('occupation', formData.occupation || '');
      payload.append('motivation', formData.motivation || '');
      payload.append('rejection_reason', '');

      const res = await fetch(buildApiUrl('/membership-registrations/'), {
        method: 'POST',
        body: payload,
      });

      if (!res.ok) {
        const errText = await res.text(); // backend may not return JSON
        console.error('API ERROR:', errText);

        alert(
          locale === 'np'
            ? 'कृपया सबै आवश्यक विवरण भर्नुहोस्।'
            : 'Please fill in all required fields.'
        );
        return;
      }
      const data = await res.json();
      console.log('Success:', data);
      alert(locale === 'np' ? 'फारम सफलतापूर्वक पेश गरियो!' : 'Form submitted successfully!');

      // Reset form
      setFormData({
        fullName: '',
        fatherName: '',
        motherName: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        province: '',
        district: '',
        municipality: '',
        ward: '',
        tole: '',
        citizenshipNo: '',
        photo: null,
        citizenship: null,
        occupation: '',
        motivation: '',
        agreed: false,
      });
      setCurrentStep(1);

    } catch (err) {
      console.error(err);
      alert(locale === 'np' ? 'अप्रत्याशित त्रुटि। कृपया पुन: प्रयास गर्नुहोस्।' : 'Unexpected error. Please try again.');
    }
  };
  const t = useTranslations('register');
  const a = useTranslations('membership');


  return (
    <>
      <MetaTags slug="register" />
      <div className="">
        <PageHeader slug="register" />
      </div>
      <div className="min-h-screen bg-[#f2f2f2] py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#2772b0] text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              {locale === 'np' ? 'सदस्यता आवेदन फारम' : 'Membership Application Form'}
            </h1>

            <p className="text-lg opacity-90">
              {locale === 'np'
                ? 'कृपया सबै विवरण सही रूपमा भर्नुहोस्'
                : 'Please fill all details correctly'}
            </p>

          </div>

          {/* Steps Indicator */}
          <div className="bg-gray-50 p-8">
            <div className="flex justify-between items-center relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 hidden md:block">
                <div
                  className="h-full bg-[#f2f2f2] transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps */}
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                          ? 'bg-[#2772b0] text-white'
                          : isActive
                            ? 'bg-[#2772b0] text-white scale-110'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {isCompleted ? <Check size={24} /> : <Icon size={24} />}
                    </div>
                    <p
                      className={`mt-3 text-xs md:text-sm font-medium text-center ${isActive ? 'text-blue-600' : 'text-gray-600'
                        }`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}  className="space-y-5">

            <div className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{locale === 'np' ? a('steps.personal') : a('steps.personal')}</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.fullName') : a('fields.fullName')}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="आफ्नो पुरा नाम लेख्नुहोस्"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.fatherName') : a('fields.fatherName')}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="बुबाको नाम लेख्नुहोस्"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.motherName') : a('fields.motherName')}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="आमाको नाम लेख्नुहोस्"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.dateofbirth') : a('fields.dateofbirth')}

                        <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        max={maxDate}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg outline-none"
                      />
                    </div>


                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.gender') : a('fields.gender')}

                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                      >
                        <option value=""> {locale === 'np' ? 'छान्नुहोस्' : 'Select'} </option>
                        <option value="male">पुरुष</option>
                        <option value="female">महिला</option>
                        <option value="other">अन्य</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.phone') : a('fields.phone')}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="९८XXXXXXXX"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.email') : a('fields.email')}

                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{locale === 'np' ? a('steps.address') : a('steps.address')}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.province') : a('fields.province')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                      >
                        <option value="">छान्नुहोस्</option>
                        <option value="koshi">कोशी</option>
                        <option value="madhesh">मधेश प्रदेश</option>
                        <option value="bagmati">बागमती प्रदेश</option>
                        <option value="gandaki">गण्डकी प्रदेश</option>
                        <option value="lumbini">लुम्बिनी प्रदेश</option>
                        <option value="karnali">कर्णाली प्रदेश</option>
                        <option value="sudurpaschim">सुदूरपश्चिम प्रदेश</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.district') : a('fields.district')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="जिल्लाको नाम"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.municipality') : a('fields.municipality')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="municipality"
                        value={formData.municipality}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="नगरपालिका/गाउँपालिका"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.ward') : a('fields.ward')}<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="वडा नम्बर"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.tole') : a('fields.tole')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="tole"
                        value={formData.tole}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="टोल/बस्तीको नाम"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Document Upload */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{locale === 'np' ? a('steps.documents') : a('steps.documents')}</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.citizenshipNo') : a('fields.citizenshipNo')}<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="citizenshipNo"
                        value={formData.citizenshipNo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                        placeholder="नागरिकता नम्बर"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.photo') : a('fields.photo')}<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                      />
                      <p className="mt-2 text-sm text-gray-500">JPG, PNG वा GIF (अधिकतम 2MB)</p>
                      {formData.photo && (
                        <p className="mt-2 text-sm text-green-600">✓ {formData.photo.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {locale === 'np' ? a('fields.citizenship') : a('fields.citizenship')}<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="citizenship"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        className="w-full px-4 py-3 border border-gray-300 bg-gray-300 text-black rounded-lg  outline-none"
                      />
                      <p className="mt-2 text-sm text-gray-500">PDF वा Image (अधिकतम 5MB)</p>
                      {formData.citizenship && (
                        <p className="mt-2 text-sm text-green-600">✓ {formData.citizenship.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review and Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6"> {locale === 'np' ? a('steps.review') : a('steps.review')}</h2>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3 text-lg">{locale === 'np' ? a('steps.personal') : a('steps.personal')}</h3>
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-500">
                        <div><span className="font-medium">{locale === 'np' ? a('fields.fullName') : a('fields.fullName')}:</span> {formData.fullName || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.fatherName') : a('fields.fatherName')}:</span> {formData.fatherName || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.motherName') : a('fields.motherName')}:</span> {formData.motherName || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.dateofbirth') : a('fields.dateofbirth')}:</span> {formData.dob || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.gender') : a('fields.gender')}:</span> {formData.gender || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.phone') : a('fields.phone')}:</span> {formData.phone || '-'}</div>
                        {formData.email && <div className="md:col-span-2"><span className="font-medium">{locale === 'np' ? a('fields.email') : a('fields.email')}:</span> {formData.email}</div>}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-700 mb-3 text-lg">{locale === 'np' ? a('steps.address') : a('steps.address')} </h3>
                      <div className="grid md:grid-cols-2 gap-3 text-gray-500 text-sm">
                        <div><span className="font-medium">{locale === 'np' ? a('fields.province') : a('fields.province')}:</span> {formData.province || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.district') : a('fields.district')}:</span> {formData.district || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.municipality') : a('fields.municipality')}:</span> {formData.municipality || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.ward') : a('fields.ward')}:</span> {formData.ward || '-'}</div>
                        <div className="md:col-span-2"><span className="font-medium">{locale === 'np' ? a('fields.tole') : a('fields.tole')}:</span> {formData.tole || '-'}</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-700 mb-3 text-lg">{locale === 'np' ? a('steps.documents') : a('steps.documents')}</h3>
                      <div className="text-sm space-y-2 text-gray-500">
                        <div><span className="font-medium">{locale === 'np' ? a('fields.citizenshipNo') : a('fields.citizenshipNo')} :</span> {formData.citizenshipNo || '-'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.photo') : a('fields.photo')}:</span> {formData.photo?.name || 'अपलोड गरिएको छैन'}</div>
                        <div><span className="font-medium">{locale === 'np' ? a('fields.citizenship') : a('fields.citizenship')}:</span> {formData.citizenship?.name || 'अपलोड गरिएको छैन'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        className="mt-1 mr-3"
                      />
                      <p className="text-sm text-gray-700">
                        {a('terms')}
                      </p>

                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  <ChevronLeft size={20} className="mr-2" />

                  {a('prev')}
                </button>

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-[#2772b0] text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                  >
                    {a('next')}
                    <ChevronRight size={20} className="ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.agreed}
                    className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${formData.agreed
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    <Check size={20} className="mr-2" />
                    {a('submit')}
                  </button>
                )}
              </div>
            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default MembershipFormBasic;