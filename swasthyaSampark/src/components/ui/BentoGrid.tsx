import React, { ReactNode } from 'react';
// import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from './button.tsx';
interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
    return (
        <div className={`grid w-full auto-rows-[16rem] sm:auto-rows-[16rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
            {children}
        </div>
    );
};

interface BentoCardProps {
    Icon: React.ElementType;
    name: string;
    description: ReactNode; // Change from string to ReactNode
    href: string;
    cta: string;
    className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({ Icon, name, description, href, cta, className }) => {
    return (
        <div
            className={`group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl
                  bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]
                  transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]
                  ${className}`}
        >
            <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 sm:p-6 transition-all duration-300 group-hover:-translate-y-10">
                <Icon className="h-10 w-10 sm:h-12 sm:w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75"/>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                    {name}
                </h3>
                <div className="max-w-lg text-sm sm:text-base text-neutral-400">{description}</div>
            </div>

            <div className="absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = href}
                    className="text-sm font-medium text-primary hover:text-primary/80"
                >
                    {cta}
                </Button>
            </div>
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"/>
        </div>
    );
};