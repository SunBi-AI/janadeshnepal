'use client';

import { useEffect, useState } from 'react';
import Container from '../layout/Container';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { buildApiUrl } from '@/lib/config';

/* ---------------- TYPES ---------------- */
type Campaign = {
  id: number;
  title_en: string;
  title_np: string;
  slug: string;
};

export default function JoinMovementNews() {
  const locale = useLocale(); // 'en' | 'np'
  const isNP = locale === 'np';

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: '',
    memberType: 'Member',
    campaign_info: '',
  });

  /* ---------------- FETCH CAMPAIGNS ---------------- */
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(buildApiUrl('/campaigns/'));
        const data = await res.json();
        setCampaigns(data.results || []);
      } catch (err) {
        console.error('Failed to load campaigns', err);
      } finally {
        setLoadingCampaigns(false);
      }
    };

    fetchCampaigns();
  }, []);

  const inputClass =
    'px-4 py-3 rounded-md border border-green-600 bg-[#c8f7dc] text-[#1a73e8] ' +
    'focus:outline-none focus:ring-0 focus:border-green-600 transition-colors';

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.province.toLowerCase(),
        membership_type: formData.memberType.toLowerCase(),
        campaign_info: formData.campaign_info || null,
        skills: '',
        availability: '',
      };

      const res = await fetch(buildApiUrl('/volunteers/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data?.detail || 'Submission failed');
      }

      alert(isNP ? 'सफलतापूर्वक सहभागी हुनुभयो!' : 'Successfully joined the movement!');

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        province: '',
        memberType: 'Member',
        campaign_info: '',
      });
    } catch (err: any) {
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-[#c8f7dc]">
      <Container className="relative">
        <div className="bg-[#c8f7dc] py-12 relative overflow-hidden">
          <h2 className="text-3xl font-semibold text-[#1baa5a] mb-10">
            {isNP ? 'अभियानमा जोडिनुहोस् ' : 'Join The Movement'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={isNP ? 'आफ्नो पुरा नाम' : 'Full Name'}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={inputClass}
                />

                <select
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="">
                    {isNP ? 'प्रदेश छान्नुहोस्' : 'Select Province'}
                  </option>
                  <option>Koshi</option>
                  <option>Gandaki</option>
                  <option>Madhesh</option>
                  <option>Bagmati</option>
                  <option>Lumbini</option>
                  <option>Sudurpashchim</option>
                  <option>Karnali</option>
                </select>

                <input
                  type="email"
                  placeholder={isNP ? 'इमेल' : 'Email'}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                />

                <input
                  type="tel"
                  placeholder={isNP ? 'फोन नम्बर' : 'Phone'}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              {/* Campaign Dropdown (EN / NP) */}
              <select
                value={formData.campaign_info}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    campaign_info: e.target.value,
                  })
                }
                className={inputClass}
                disabled={loadingCampaigns}
              >
                <option value="">
                  {loadingCampaigns
                    ? isNP
                      ? 'क्याम्पेन लोड हुँदैछ...'
                      : 'Loading campaigns...'
                    : isNP
                    ? 'क्याम्पेन छान्नुहोस्'
                    : 'Select Campaign'}
                </option>

                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.slug}>
                    {isNP ? campaign.title_np : campaign.title_en}
                  </option>
                ))}
              </select>

              {/* Member Type */}
              <div className="flex gap-6 flex-wrap">
                {(isNP
                  ? ['सदस्य', 'स्वयंसेवक', 'दाता']
                  : ['Member', 'Volunteer', 'Donor']
                ).map((type, idx) => {
                  const value = ['Member', 'Volunteer', 'Donor'][idx];
                  return (
                    <label key={value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="memberType"
                        value={value}
                        checked={formData.memberType === value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            memberType: e.target.value,
                          })
                        }
                        className="sr-only"
                      />
                      <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
                        <div
                          className={`w-2.5 h-2.5 rounded-full bg-green-600 ${
                            formData.memberType === value ? 'scale-100' : 'scale-0'
                          } transition-transform`}
                        />
                      </div>
                      <span className="text-green-800 font-medium">
                        {type}
                      </span>
                    </label>
                  );
                })}
              </div>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-full max-w-max border-white/60 border bg-green-600 hover:bg-green-800 text-white shadow-lg transition duration-300"
              >
                {isNP ? 'अहिले सहभागी हुनुहोस्' : 'Join Now'}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute z-30 -top-14 right-24 hidden md:block">
          <Image
            src="/assets/birds.png"
            alt="Join the Movement Illustration"
            width={500}
            height={200}
          />
        </div>
      </Container>
    </div>
  );
}
