import { memo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
    ciudad: string;
    calle: string;
}

function CarCardUbicacion({ ciudad, calle }: Props) {
    return (
    <div className="flex items-center gap-1 mt-2 font-semibold text-sm">
        <FaMapMarkerAlt /> {ciudad}, {calle}
    </div>
    );
}
export default memo(CarCardUbicacion);