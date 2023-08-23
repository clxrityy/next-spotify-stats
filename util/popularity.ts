export const popularity = (value: number): string => {
    let color: string = 'white';

    if (value <= 10) {
        return color = '#de2618';
    }
    else if (value <= 20 && value > 10) {
        return color = '#b8352c';
    }
    else if (value <= 30 && value > 20) {
        return color = '#91322c';
    }
    else if (value <= 40 && value > 30) {
        return color = '#91413c';
    }
    else if (value <= 50 && value > 40) {
        return color = '#753b37';
    }
    else if (value <= 60 && value > 50) {
        return color = '#914230';
    }
    else if (value <= 70 && value > 60) {
        return color = '#99675c';
    }
    else if (value <= 80 && value > 70) {
        return color = '#597a4d';
    }
    else if (value <= 90 && value > 80) {
        return color = '#558742';
    }
    else if (value <= 100 && value > 90) {
        return color = '#58a83b';
    }
    else if (value === 100) {
        return color = '#3b63a8';
    }

    return color;
}