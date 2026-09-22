const COOKIE_NAME = "students_data";

// get students array from cookies
function getStudents() {
    const allCookies = document.cookie;
    if (!allCookies) return [];

    const cookiesArray = allCookies.split(";");
    for (let cookie of cookiesArray) {
        let [name, val] = cookie.trim().split("=");
        if (name === COOKIE_NAME && val) {
            try {
                return JSON.parse(decodeURIComponent(val));
            } catch (e) {
                return [];
            }
        }
    }
    return [];
}

// save students array to cookies
function saveStudents(studentsList) {
    const jsonStr = JSON.stringify(studentsList);
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(jsonStr)}; path=/; max-age=31536000`;
}

// find student by isu
function getStudentByIsu(isu) {
    return getStudents().find(student => student.isuId === isu) || null;
}

// add student to list
function addStudent(studentData) {
    const list = getStudents();
    list.push(studentData);
    saveStudents(list);
}

// update student data
function updateStudent(isu, updatedData) {
    const list = getStudents();
    const index = list.findIndex(student => student.isuId === isu);
    if (index !== -1) {
        list[index] = updatedData;
        saveStudents(list);
    }
}

// delete student by isu
function deleteStudent(isu) {
    let list = getStudents();
    list = list.filter(student => student.isuId !== isu);
    saveStudents(list);
}