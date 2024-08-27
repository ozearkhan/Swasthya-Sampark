
import React from 'react';
import { BentoGrid, BentoCard } from './BentoGrid';
// import ButtonComponent from './ButtonComponent';
import {
    ChatBubbleIcon,
    PersonIcon,
    CardStackIcon,
    FileTextIcon,
    ImageIcon,
    CalendarIcon,
} from '@radix-ui/react-icons';
import DoctorIcon from "../../public/icon/Doctor.tsx";

const services = [
    {
        Icon: CardStackIcon,
        name: "Symptom Checker",
        description: (
            <>
                Leverage our AI-powered Symptom Checker for instant health insights. Describe symptoms and receive personalized guidance within minutes.
                <ul className="list-disc pl-5 mt-2">
                    <li>24/7 access to self-service symptom assessments</li>
                    <li>AI-driven care navigation for accurate results</li>
                    <li>Eliminates long wait times with instant recommendations</li>
                    {/*<li>Easy-to-use, patient-centric, and highly informative</li>*/}
                </ul>
            </>
        ),
        href: "/survey",
        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-2",
    },
    {
        Icon: DoctorIcon,
        name: "Doctor Portal",
        description: "Manage schedules and perform consultations efficiently.",
        href: "/consultation/doctor",
        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
    },
    {
        Icon: ChatBubbleIcon,
        name: "AI Chatbot",
        description: (
            <>
                Engage with our AI Chatbot, your virtual health assistant. Powered by cutting-edge AI and ML, it offers:
                <ul className="list-disc pl-5 mt-2">
                    <li>Instant answers to preliminary health inquiries</li>
                    <li>Comprehensive information on causes, symptoms, and treatments</li>
                    <li>Over-the-counter medication guidance and precautions</li>
                    {/*<li>Recommendations on when to seek medical care</li>*/}
                </ul>
            </>
        ),
        href: "/consultation/chat_bot",
        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-2",
    },
    {
        Icon: FileTextIcon,
        name: "Report Summary Generation",
        description: (
            <>
                Utilize our AI-driven tool to transform medical reports from images to text with precision. Streamline your workflow with:
                <ul className="list-disc pl-5 mt-2">
                    <li>Advanced image recognition powered by ML algorithms</li>
                    <li>Quick and accurate conversion of reports</li>
                    <li>Enhanced efficiency in handling medical documentation</li>
                </ul>
            </>
        ),
        href: "/consultation/upload_reports",
        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-2",
    },
    {
        Icon: PersonIcon,
        name: "Patient Portal",
        description: "Access health records and manage appointments easily.",
        href: "/consultation/patient",
        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
    },
    {
        Icon: CalendarIcon,
        name: "Consultation Management",
        description: "Streamline patient-doctor consultation process.",
        href: "/consultation",
        cta: "Learn more",
        className: "lg:col-span-1 lg:row-span-1",
    },
];



const OurServices = () => {
    return (
        <div className="flex justify-center items-center flex-col pt-32">
            <h3 className="h3">Our Services</h3>
            <h1 className="h1 tracking-wider py-4">
                Smart Health Solutions
            </h1>
            <div className="max-w-[calc(100%-2rem)] md:max-w-5xl w-full py-10">
                <BentoGrid className="lg:grid-cols-3 lg:grid-rows-3 gap-4">
                    {services.map((service) => (
                        <BentoCard
                            key={service.name}
                            {...service}
                        />
                    ))}
                </BentoGrid>
            </div>
        </div>
    );
};

export default OurServices;
