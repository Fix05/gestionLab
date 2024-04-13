

export const ExtraMapping = (element, index) => ({
    Nombre: element.name + ' ' + element.lastname,
    Cedula: element.dni,
    Departamento: element.department,
    Sueldo: element.base_salary,
    Estado: element.state,
    Id: element.id
});


export const PaymentMapping = (element, index) => ({
    Nombre: element.name + ' ' + element.lastname,
    Sueldo: element.base_salary,
    "Pagado el": `${element.date ? element.date : "---"}`,
    "Fecha mínima": element.min_date,
    "Fecha máxima": element.max_date,
    Estado: element.state,
    Monto: `${element.amount ? element.amount : "---"}`,
    Id: element.id_payment,
});