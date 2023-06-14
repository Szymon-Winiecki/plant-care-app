import { addDays, getDiffInDays } from "../helpers/dateTimeHelper";
import * as Icons from "../constants/icons";

const wateringStates = {
    DO_NOT_WATER: Symbol('DO_NOT_WATER'),    // roślina nie potrzebuje podlewania
    TO_WATER: Symbol('TO_WATER'),        // należy podlać
    WATER_WARNING: Symbol('WATER_WARNING'),   // termin na podlewanie nieznacznie przekroczony
    WATER_CRITICAL: Symbol('WATER_CRITICAL')   // termin podlewania znacznie przekroczony
}


// wszystkie liczby podane w dniach
const wateringStatesRanges = [
    {
        from: Number.MAX_SAFE_INTEGER,
        to: 0.5,
        state: wateringStates.DO_NOT_WATER
    },
    {
        from: 0.5,
        to: -0.5,
        state: wateringStates.TO_WATER
    },
    {
        from: -0.5,
        to: -1.5,
        state: wateringStates.WATER_WARNING
    },
    {
        from: -1.5,
        to: Number.MIN_SAFE_INTEGER,
        state: wateringStates.WATER_CRITICAL
    },
];

const wateringStatesIcons = {}
wateringStatesIcons[wateringStates.DO_NOT_WATER] = Icons.empty;
wateringStatesIcons[wateringStates.TO_WATER] = Icons.water_drop_ok;
wateringStatesIcons[wateringStates.WATER_WARNING] = Icons.water_drop_warning;
wateringStatesIcons[wateringStates.WATER_CRITICAL] = Icons.water_drop_error;


// lastWatering jako milliseconds since the UNIX epoch, wateringInterval w dniach
const getWateringState = (lastWatering, wateringInterval) => {
    const nextWatering = addDays(lastWatering, wateringInterval);
    const now = Date.now();
    const daysToWatering = getDiffInDays(now, nextWatering);

    for (let i = 0; i < wateringStatesRanges.length; i++) {
        if (daysToWatering < wateringStatesRanges[i].from && daysToWatering >= wateringStatesRanges[i].to) {
            return wateringStatesRanges[i].state;
        }
    }

    return wateringStates.DO_NOT_WATER;
}

export { wateringStates, getWateringState, wateringStatesIcons }