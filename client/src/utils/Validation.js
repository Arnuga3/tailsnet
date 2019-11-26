import Configuration from './Configuration';

export default class Validation {

    static validEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static analysePasswordStrength(password) {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if (strongRegex.test(password)) return 'Strong password';
        if (mediumRegex.test(password)) return 'Medium password';
        return 'Weak password';
    }

    static validatePasswords = (psswd, psswdRep) => {
        let errors = [];
        const psswdVal = psswd.value.trim();
        const psswdRepVal = psswdRep.value.trim();

        if (psswdVal === '')
            errors.push({ name: psswd.name });

        if (psswdRepVal === '')
            errors.push({ name: psswdRep.name });

        if (psswdVal !== psswdRepVal)
            errors.push({ error: Configuration.NOT_MATCHING, name: psswdRep.name });
        
        return errors;
    }
}