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

export const collectedSymptomsState = atom({
    key: 'collectedSymptomsState',
    default: [],
});


