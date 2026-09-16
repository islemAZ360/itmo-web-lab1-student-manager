const COOKIE_NAME = "students_data";

export function getStudents() {
    const allCookies = document.cookie;
    const cookiesArray = allCookies.split(";");
    for (let cookie of cookiesArray) {
        let [name, val] = cookie.trim().split("=");
        if (name === COOKIE_NAME) {
            try { return JSON.parse(decodeURIComponent(val)); } catch (e) { return []; }
        }
    }
    return [];
}

export function saveStudents(studentsList) {
    const jsonStr = JSON.stringify(studentsList);
    const encoded = encodeURIComponent(jsonStr);
    if (encoded.length > 4000) throw new Error("Cookie limit exceeded!");
    document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=31536000; SameSite=Strict`;
}

// তোমার বন্ধুর দেওয়া ডিফল্ট ডাটা
export function initDummyData() {
    let list = getStudents();
    if (list.length === 0) {
        list = [
            { id: "1", fullName: "Islam Azaizia", group: "P3224", isuId: "470449", dormitoryNumber: "1", room: "2224", accommodationPeriod: "2024-01-01", isForeigner: true, notes: "" },
            { id: "2", fullName: "bomba lakaka", group: "P3224", isuId: "654321", dormitoryNumber: "1", room: "505", accommodationPeriod: "2024-01-01", isForeigner: false, notes: "" }
        ];
        saveStudents(list);
    }
}

export function getStudentById(id) {
    return getStudents().find(s => s.id === id) || null;
}

export function addStudent(studentData) {
    const students = getStudents();
    students.push({ ...studentData, id: Date.now().toString() });
    saveStudents(students);
}

export function updateStudent(id, studentData) {
    const students = getStudents();
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...studentData, id };
        saveStudents(students);
    }
}

export function deleteStudent(id) {
    let students = getStudents();
    students = students.filter(s => s.id !== id);
    saveStudents(students);
}