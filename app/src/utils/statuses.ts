type tStatusInfo = {
    title: string;
    color: string;
    backgroundColor: string;
}

type tStatusInfos = {
    [key: string]: tStatusInfo;
}


export const StatusInfos: tStatusInfos = {
    AVAILABLE: {
        title: 'Disponible',
        color: '#00CC7A',
        backgroundColor: '#CCFFEB',
    },
    NOT_AVAILABLE: {
        title: 'Plus disponible',
        color: '#BA1225',
        backgroundColor: '#FBD0D5',
    },
    CONTACTED: {
        title: 'Contacté',
        color: '#2711BB',
        backgroundColor: '#D6D0FB',
    },
    NOT_CONTACTED: {
        title: 'Non contacté',
        color: '#CC8900',
        backgroundColor: '#FFEECC',
    },
}
