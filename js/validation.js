/**
 * Валидация данных студента через JavaScript
 * Проверяет типы данных, пустоту со строгим trim() и формат ИСУ
 */
export function validateStudentData(data) {
    const errors = [];

    // Строковые проверки на пустоту (trim предотвращает пробелы)
    if (!data.fullName || !data.fullName.trim()) {
        errors.push("ФИО обязательно для заполнения.");
    }

    if (!data.group || !data.group.trim()) {
        errors.push("Группа обязательна для заполнения.");
    }

    if (!data.room || !data.room.trim()) {
        errors.push("Номер комнаты обязателен для заполнения.");
    }

    // Проверка ИСУ ID (ровно 6 цифр)
    const isuRegex = /^\d{6}$/;
    if (!isuRegex.test(data.isuId)) {
        errors.push("ИСУ ID должен содержать ровно 6 цифр (например, 123456).");
    }

    // Числовая проверка для номера общежития
    const dorm = Number(data.dormitoryNumber);
    if (!data.dormitoryNumber || isNaN(dorm) || dorm <= 0) {
        errors.push("Номер общежития должен быть корректным положительным числом.");
    }

    // Проверка даты
    if (!data.accommodationPeriod) {
        errors.push("Срок заселения обязателен.");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
