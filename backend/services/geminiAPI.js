const { GoogleGenerativeAI } = require("@google/generative-ai");
const logger = require('../config/logger');
const symptomDataset = require("../data/symptomDataset");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.expandSymptom = async (symptom) => {
    try {
        logger.info(`Expanding symptom: ${symptom}`);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are a medical AI assistant with access to a comprehensive symptom dataset that maps diseases to their associated symptoms.
        Given the initial symptom "${symptom}", use this dataset to identify related symptoms and potential diseases.
        Provide a list of related symptoms or follow-up questions to narrow down the possible conditions. 
        Format your response as a JSON object with the following structure:
        
        {
          "type": "multiple_choice",
          "question": "The question to ask the user about related symptoms or to narrow down the condition",
          "options": ["Related symptom ", "Related symptom ", ...]
        }
        
        Ensure that your options are directly related to the initial symptom and the potential diseases associated with it in the symptom dataset.
        Do not include any explanatory text or additional information. Only provide the JSON object.
        If the initial symptom is very specific and strongly indicates a particular condition, 
        you may provide options that are diagnostic criteria or additional symptoms of that condition.
        Remember to use the "${symptomDataset}" as your primary reference to maintain accuracy and relevance in your responses.Also do exclude the symptoms which are already present in "${symptom}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        let parsedResponse;
        try {
            // Remove Markdown code block syntax if present
            const cleanedText = text.replace(/```json\n|\n```/g, '').trim();
            parsedResponse = JSON.parse(cleanedText);
        } catch (parseError) {
            logger.error(`Error parsing Gemini API response: ${parseError.message}`);
            logger.debug(`Raw response: ${text}`);
            throw new Error('Failed to parse API response');
        }

        logger.info(`Symptom expanded successfully: ${symptom}`);
        return parsedResponse;
    } catch (error) {
        logger.error(`Error expanding symptom with Gemini API: ${error.message}`);
        return null;
    }
};

exports.checkApiHealth = async () => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await model.generateContent("Test");
        return true;
    } catch (error) {
        logger.error(`Gemini API health check failed: ${error.message}`);
        return false;
    }
};