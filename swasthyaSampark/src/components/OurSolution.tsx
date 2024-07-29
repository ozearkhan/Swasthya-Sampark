import OurSolutionCard from "./OurSolutionCard.tsx";

const OurSolution = ()=>{
    return <div className="flex justify-center items-center flex-col py-36">
        <h3 className="h3">Our Solution</h3>
        <div>
            <h1 className="h1 tracking-wider py-4">
                Platform modules
            </h1>
        </div>

        <div className="grid grid-cols-2 gap-10 py-10">
            <OurSolutionCard imgSrc={"/src/assets/checkSymptom.jpg"} heading={"Triage"}
                             body={"Integrates into websites, apps, portals, and call centers for symptom checks, self-triage," +
                                 " condition insights, patient education, and care navigation."}
            />

            <OurSolutionCard imgSrc={"src/assets/medicalHistory.jpg"} heading={"Intake"}
                             body={"Gather symptoms, risk factors, history, and demographics pre-visit to reduce admin tasks and increase physician-patient time."}
            />
        </div>


    </div>
}
export default OurSolution;