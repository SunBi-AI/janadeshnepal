'use client';

import { Lightbulb, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "../layout/Container";

export default function MissionVision() {
  const t = useTranslations("missionVision");

  return (
    <section className="bg-white py-12">
      <Container>
        <div className="">
            <div className="grid gap-6 md:grid-cols-2">

            {/* Mission */}
            <div className="rounded-2xl  p-8 border border-gray-100 bg-gray-50 transition duration-300 hover:border-blue-200 ">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-blue-600">
                {t("missionTitle")}
                </h3>

                <p className="text-gray-600 text-base  leading-relaxed">
                {t("missionText")}
                </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl  p-8 border border-gray-100 bg-gray-50 transition duration-300 hover:border-blue-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-green-600">
                {t("visionTitle")}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed">
                {t("visionText")}
                </p>
            </div>

            </div>
        </div>
      </Container>
    </section>
  );
}
