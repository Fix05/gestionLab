

export const ExtraMapping = (element, index) => ({
    "N°": index + 1,
    Nombre: element.name + ' ' + element.lastname,
    Cedula: element.dni,
    Departamento: element.department,
    Sueldo: element.base_salary,
    Estado: element.state,
    Id: element.id
});

export const RequestsMapping = (element, index) => ({
    "Id": element.id,
    Tipo: element.type,
    "Razón": element.reason,
    Fecha: element.date,
    Estado: element.state,
});


export const PaymentMapping = (element, index) => ({
    "N°": index + 1,
    Nombre: element.name + ' ' + element.lastname,
    Sueldo: element.base_salary,
    "Pagado el": `${element.date ? element.date : "---"}`,
    "Fecha mínima": element.min_date,
    "Fecha máxima": element.max_date,
    Estado: element.state,
    Monto: `${element.amount ? element.amount : "---"}`,
    Id: element.id_payment,
});


export const AdvanceRecordMapping = (element, index) => ({
    "N°": index + 1,
    Nombre: element.name + ' ' + element.lastname,
    Salario: element.base_salary,
    "Fecha": element.date,
    Estado: element.state,
    Monto: `${element.amount ? element.amount : "---"}`,
    Id: element.id_advance,
});


export const ExtraRecordMapping = (element, index) => ({
    "N°": index + 1,
    Nombre: element.name + ' ' + element.lastname,
    Salario: element.base_salary,
    "Fecha": element.date,
    Estado: element.state,
    Monto: `${element.amount ? element.amount : "---"}`,
    Horas: element.hours,
    Id: element.id_extra,
});


export const PaymentInfoMapping = (element, index, FieldsDictionary) => {

    const newObj = {}
    for (let cat in element) {
        if (element.hasOwnProperty(cat))
            newObj[cat] = element[cat].map((sect) => {
                const newSection = {}
                for (let att in sect) {
                    if (sect.hasOwnProperty(att)) {
                        if (FieldsDictionary[att]) {
                            newSection[FieldsDictionary[att]] = sect[att]
                        }
                    }
                }
                return newSection
            })
    }
    return newObj
};

export const AdvanceListMapping = (element, index) => ({
    "N°": index + 1,
    Fecha: element.date,
    Monto: element.amount,
    Id: element.id
});

export const ExtraListMapping = (element, index) => ({
    "N°": index + 1,
    Fecha: element.date,
    Monto: element.amount,
    Horas: element.hours,
    Id: element.id
});



export const VacationsMapping = (element, index) => ({
    "N°": index + 1,
    Nombre: element.name + ' ' + element.lastname,
    "Fecha de inicio": element.start_date,
    "Fecha de fin": element.end_date,
    Tipo: element.type,
    Estado: element.state,
    "Días": element.taken_days,
    Id: element.id,
});

