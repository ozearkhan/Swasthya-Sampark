import { atom } from 'recoil';

export const clientIdState = atom<string>({
    key: 'clientIdState',
    default: '',  // Assuming the client ID is a string, you can initialize it as an empty string
});

export const patientInfoState = atom({
    key: 'patientInfoState',
    default: { age: '', gender: '' },
});

export const medicalHistoryState = atom<string[]>({
    key: 'medicalHistoryState',
    default: [],
});

export const collectedSymptomsState = atom<string[]>({
    key: 'collectedSymptomsState',
    default: [],
});
