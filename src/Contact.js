const fs = require('fs');
const path = require('path');
const db = new Map();

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/Contact.json'));
    const contactArray = JSON.parse(jsonData);

    contactArray.forEach((element) => {
        db.set(element[0], element[1]);
    });
};
const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/Contact.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        const newcontact = {
            id: crypto.randomUUID(),
            contact: contact.text,
            
        };
        db.set(newcontact.id, newcontact);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact);
        saveData();
    },

};

loadData();

module.exports = repo;