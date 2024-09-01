import './doctorCard.css';

interface DoctorCardProps {
    name: string;
    picture: string;
    logicMagic: () => void;
}

const DoctorCard = ({ name, picture, logicMagic }: DoctorCardProps) => {
    return (
        <div className="doctor-card">
            <div className="doctor-card__image-container">
                <img src={picture} alt={name} className="doctor-card__image" />
            </div>
            <div className="doctor-card__content">
                <h3 className="doctor-card__name">{name}</h3>
                <button className="doctor-card__button" onClick={logicMagic}>
                    Consult
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;
