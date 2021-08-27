const SIN_LENGTH = 9;

const luhnChecksum = (sin: string) => {
    let len = SIN_LENGTH;
    let mul = 0;
    const luhnArr = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ];
    let sum = 0;
    while (len--) {
        sum += luhnArr[mul][parseInt(sin.charAt(len), 10)];
        mul = mul ^ 1;
    }
    return sum % 10;
};


const normalize = (sin: string) => {
    return sin.replace(/\D/g, '');
}

/**
  * Expression.
  */

const expression = /^\d{3}[- ]{0,1}\d{3}[- ]{0,1}\d{3}$/;

/**
 * Validate function.
 */
function isValid(value: string) {
    if (!expression.test(value)) {
        return false;
    }

    const normalized = normalize(value);
    const checksum = luhnChecksum(normalized);
    return checksum % 10 == 0;
}


type MaskType = 'full' | 'partial';

/**
 * Mask the SIN with "X" placeholders to protect sensitive data,
 * while keeping some of the original digits for contextual recognition.
 */

function mask(value: string, type: MaskType = 'partial'): string {
    if (!isValid(value)) {
        throw new Error('Invalid Social Insurance Number');
    }

    if (type == 'partial')
        return `${value.substr(0, value.length - 3).replace(/[\w]/g, 'X')}${value.substr(-3)}`;

    return value.replace(/[\w]/g, 'X');
}

export {
    isValid,
    mask,
    MaskType
};
