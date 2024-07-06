import { atom } from 'recoil';

export const clientIdState = atom({
    key: 'clientIdState',
    default: () => clientIdState,
});

export const patientInfoState = atom({
    key: 'patientInfoState',
    default: { age: '', gender: '' },
});

export const medicalHistoryState = atom({
    key: 'medicalHistoryState',
    default: [],
});

export const selectedSymptomsState = atom({
    key: 'selectedSymptomsState',
    default: [],
});

export const currentStepState = atom({
    key: 'currentStepState',
    default: 0,
});

export const resultsState = atom({
    key: 'resultsState',
    default: null,
});

