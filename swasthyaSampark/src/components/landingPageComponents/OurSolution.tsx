import OurSolutionCard from "../ui/OurSolutionCard.tsx";

const OurSolution = () => {
    return (
        <div className="flex justify-center items-center flex-col pt-32">
            <h3 className="h3">Our Solution</h3>
            <div>
                <h1 className="h1 tracking-wider py-4 text-center text-5xl sm:text-4xl md:text-5xl lg:text-6xl">
                    Platform modules
                </h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-10 max-w-[calc(100%-2rem)] md:max-w-5xl">
                <OurSolutionCard
                    imgSrc={"/WhoWeHelp/checkSymptom.jpg"}
                    heading={"Triage"}
                    body={"Integrates into websites, apps, portals, and call centers for symptom checks, self-triage, condition insights, patient education, and care navigation."}
                />

                <OurSolutionCard
                    imgSrc={"/WhoWeHelp/medicalHistory.jpg"}
                    heading={"Intake"}
                    body={"Gather symptoms, risk factors, history, and demographics pre-visit to reduce admin tasks and increase physician-patient time."}
                />
            </div>
        </div>
    );
}

export default OurSolution;